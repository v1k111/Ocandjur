FROM python:3.12-slim

WORKDIR /app

# 1) копируем requirements.txt
COPY requirements.txt .

# 2) ставим зависимости (здесь подтянется и sqlmodel)
RUN pip install --no-cache-dir -r requirements.txt

# 3) копируем исходники приложения
COPY ./app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
