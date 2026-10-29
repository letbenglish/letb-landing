/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Links curtos impressos nos QR codes do livro "Let There B Light".
  // O QR aponta para o link curto; para trocar o destino, mude só o "destination".
  // permanent: false (307) para que o navegador não guarde o destino em cache.
  async redirects() {
    return [
      { source: '/light1', destination: '/light/you-did-it.html', permanent: false },
    ]
  },
}
module.exports = nextConfig
