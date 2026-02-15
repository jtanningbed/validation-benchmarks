const puppeteer = require('puppeteer');
const readline = require('readline');

async function checkXSS() {
    // Read URL from stdin
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

    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });

    const page = await browser.newPage();

    // Track alert messages
    let alertMessage = null;

    page.on('dialog', async (dialog) => {
        alertMessage = dialog.message();
        console.log(alertMessage);
        await dialog.dismiss();
    });

    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 5000 });

        // Trigger focus events on elements with autofocus or onfocus handlers
        await page.evaluate(() => {
            const elements = document.querySelectorAll('[autofocus], [onfocus]');
            elements.forEach((el) => {
                const event = new Event('focus', { bubbles: true });
                el.dispatchEvent(event);
            });
        });

        // Wait a bit for any delayed XSS execution
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('success');
    } catch (error) {
        console.log('Failed to load the page.');
    } finally {
        await browser.close();
    }
}

checkXSS();
