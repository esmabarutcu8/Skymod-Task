import React from "react";
import { Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
export const CertificateInfo = () => {
  const [certificateLink, setCertificateLink] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Ad soyad alanı zorunludur!"),
    educationType: Yup.string().required("Eğitim tipi alanı zorunludur! "),
    duration: Yup.string().required("Eğitim süresi alanı zorunludur! "),
    organizer: Yup.string().required("Eğitimi düzenleyen alanı zorunludur! "),
    date: Yup.string().required("Eğitimi tarihi zorunludur! "),
  });

  const handleSubmit = async (values) => {
    console.log("values:", values);
    try {
      const response = await axios.post(
        "http://localhost:8000/create-certificate",
        values
      );

      // Başarı durumu
      console.log("Success:", response.data); // Başarı mesajını konsola yazdır
    } catch (error) {
      // Hata durumu
      if (error.response) {
        console.log("Error:", error.response.data);
      } else if (error.request) {
        console.log("Request Error:", error.request);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className="h-screen">
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
          educationType: "", //eğitim ismi (türü)
          duration: "",
          date: "",
          organizer: "",
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="h-[700px] mt-20 flex justify-center ">
            <div className="w-[900px] border-2 rounded-md border-gray-700 justify-center items-center bg-gray-100">
              <div className="flex justify-center mt-10 text-3xl text-bold text-gray-700">
                <h3>Sertifika Bilgileri</h3>
              </div>

              <div className="mt-16 h-12 flex items-center justify-center">
                <label className="text-xl  w-48 text-gray-700 font-medium">
                  Ad Soyad:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={(e) => {
                    setFieldValue("name", e.target.value);
                  }}
                  placeholder="Ad soyad giriniz"
                  className="border-2 rounded-lg w-80 h-10 pl-2"
                />
              </div>
              <div className="w-[400px] ml-48">
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mt-5 h-12 flex items-center justify-center">
                <label className="text-xl text-gray-700 font-medium  w-48">
                  Eğitim Tipi:
                </label>
                <input
                  type="text"
                  id="educationType"
                  name="educationType"
                  value={values.educationType}
                  onChange={(e) => {
                    setFieldValue("educationType", e.target.value);
                  }}
                  placeholder="Eğitim Tipi giriniz"
                  className="border-2 rounded-lg w-80 h-10 pl-2"
                />
              </div>
              <div className=" w-[400px] ml-48">
                <ErrorMessage
                  name="type"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mt-5 h-12 flex items-center justify-center">
                <label className=" text-xl text-gray-700 font-medium  w-48">
                  Eğitim Tarihi:
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={values.date}
                  onChange={(e) => {
                    setFieldValue("date", e.target.value);
                  }}
                  className="border-2 rounded-lg w-80 h-10 pl-2"
                />
              </div>
              <div className=" w-[400px] ml-48">
                <ErrorMessage
                  name="date"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mt-5 h-12 flex items-center justify-center">
                <label className=" text-xl text-gray-700 font-medium w-48 ">
                  Eğitim Süresi (gün):
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={values.duration}
                  onChange={(e) => {
                    setFieldValue("duration", e.target.value);
                  }}
                  className="border-2 rounded-lg w-80 h-10 pl-2"
                />
              </div>
              <div className=" w-[400px] ml-48">
                <ErrorMessage
                  name="duration"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mt-5 h-12 flex items-center justify-center ">
                <label className="text-xl text-gray-700 font-medium   w-48">
                  Eğitimi Düzenleyen:
                </label>
                <input
                  type="text"
                  id="organizer"
                  name="organizer"
                  value={values.organizer}
                  onChange={(e) => {
                    setFieldValue("organizer", e.target.value);
                  }}
                  className="border-2 rounded-lg w-80 h-10 pl-2"
                />
              </div>
              <div className=" w-[400px] ml-48">
                <ErrorMessage
                  name="organizer"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="mt-5 ml-96 flex justify-center  w-40">
                <button
                  type="submit"
                  className="bg-gray-700 rounded-md text-white py-2 px-4  hover:bg-gray-500 "
                >
                  Sertifika Oluştur
                </button>
              </div>
            </div>
            <div>
              <div>
                {certificateLink ? (
                  <p>
                    Sertifika Linki:{" "}
                    <a
                      href={certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {certificateLink}
                    </a>
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
