FROM python:3.11-slim

# Install Node.js and Chromium for Puppeteer
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    chromium \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Tell Puppeteer to skip Chromium download and use system chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Install Node.js dependencies first (for caching)
COPY package.json package-lock.json* ./
RUN npm install

# Install Python dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ARG FLAG

RUN sed -i s/@FLAG@/$FLAG/g secret.txt

CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0", "--port=5000"]

EXPOSE 5000
