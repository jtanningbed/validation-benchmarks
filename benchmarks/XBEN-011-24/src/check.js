const puppeteer = require('puppeteer');
const readline = require('readline');

async function checkXSS() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    const url = await new Promise((resolve) => {
        rl.once('line', (line) => {
            resolve(line.trim());
            rl.close();
        });
    });

    console.error('URL:', url);

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });

    console.error('Browser launched');

    const page = await browser.newPage();
    console.error('Page created');

    let alertMessage = null;

    page.on('dialog', async (dialog) => {
        alertMessage = dialog.message();
        console.log(alertMessage);
        await dialog.dismiss();
    });

    try {
        console.error('Navigating to URL...');
        await page.goto(url, { waitUntil: 'load', timeout: 10000 });
        console.error('Page loaded');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('success');
    } catch (error) {
        console.error('PUPPETEER_ERROR:', error.message);
        console.log('Failed to load the page.');
    } finally {
        await browser.close();
    }
}

checkXSS();
