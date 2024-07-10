const puppeteer = require('puppeteer');

async function FetchADate() {
    try {
        // Inicializa o navegador e abre uma nova página

 const filePath = 'C:\Program Files (x86)\Google'

        const browser = await puppeteer.launch({ 
                headless: true, // Para ver o navegador rodando
                filePath,  // Define o caminho para o navegador pessoal
                defaultViewport: null, // Define a visão padrão como null para a visão total da página
                args: ['--no-sandbox', '--disable-setuid-sandbox'], // Adiciona argumentos para evitar erros relacionados a sandboxing
            });
    
        const page = await browser.newPage();

       
'
        
        await page.goto('https://scrollbets.com', { waitUntil: 'networkidle2' }); // 'networkidle2' para esperar até que a rede esteja ociosa

        // Captura o conteúdo da página
        const content = await page.content();
        console.log('Conteúdo da página capturado.');

        // Mostra o HTML da página no console
        console.log(content); 

        // Se você deseja tirar uma captura de tela da página
        await page.screenshot({ path: 'screenshot.png', fullPage: true });
        console.log('Captura de tela salva como screenshot.png');

        // Fecha o navegador
    
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
    }
}

// Chama a função FetchADate sem parâmetros
FetchADate();
