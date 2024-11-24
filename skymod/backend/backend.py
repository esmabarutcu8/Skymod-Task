# backend.py

from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
import io
import os
import secrets

app = FastAPI()

# Sertifika verilerini alacak model
class CertificateData(BaseModel):
    name: str
    type: str
    duration: str
    date: str
    organizer: str

# Benzersiz token oluşturma
def generate_unique_token():
    return secrets.token_hex(16)

# PDF dosyasını oluşturma fonksiyonu
def generate_certificate_pdf(data: CertificateData, token: str):
    packet = io.BytesIO()
    can = canvas.Canvas(packet, pagesize=letter)

    pdfmetrics.registerFont(TTFont('Poppins-Regular', './fonts/Poppins-Regular.ttf'))
    pdfmetrics.registerFont(TTFont('Poppins-Medium', './fonts/Poppins-Medium.ttf'))
    can.setFont("Poppins-Medium", 16)

    # Sertifika üzerindeki bilgileri yazıyoruz
    can.drawString(209, 455, f"Token: {token}")
    can.setFont("Poppins-Medium", 18)
    can.drawString(209, 407, data.name)
    can.drawString(209, 350, data.type)
    can.drawString(209, 290, data.duration)
    can.drawString(209, 230, data.date)
    can.drawString(209, 172, data.organizer)

    # PDF'i kaydet
    can.save()

    packet.seek(0)
    file_path = f"./certificates/{token}.pdf"
    with open(file_path, "wb") as output_file:
        output_file.write(packet.read())

    return file_path

@app.post("/create_certificate")
async def create_certificate(data: CertificateData):
    # Benzersiz token oluştur
    token = generate_unique_token()

    # PDF dosyasını oluştur
    pdf_file_path = generate_certificate_pdf(data, token)

    # Sertifika linki oluştur
    certificate_link = f"http://localhost:8000/{pdf_file_path}"

    return {"link": certificate_link}

# Sertifika dosyasını sunmak için endpoint
@app.get("/{file_path:path}")
async def serve_certificate(file_path: str):
    file_path = os.path.join('./certificates', file_path)
    if os.path.exists(file_path):
        return FileResponse(file_path)  # Dosya mevcutsa sunulacak
    return {"error": "File not found"}
