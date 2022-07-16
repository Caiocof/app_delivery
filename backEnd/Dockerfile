FROM python:3.9.6-slim-buster

WORKDIR /backEnd

COPY . .

RUN apt-get update \
    && apt-get install -y libpq-dev gcc python3-dev musl-dev

RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "127.0.0.1", "--port","8080"]
