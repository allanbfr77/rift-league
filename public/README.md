# public/

Arquivos colocados nesta pasta são servidos na **raiz** do site pelo Vite.
Ex.: `public/bg.jpg` fica acessível em `/bg.jpg`.

## Fundo do site

Coloque aqui os arquivos do fundo e referencie-os em `src/data/league.js`
(objeto `background`):

- `bg.jpg` → imagem de fundo (`background.image: '/bg.jpg'`)
- `bg.mp4` → vídeo de fundo (`background.video: '/bg.mp4'`)
- `bg.jpg` também serve de `poster` (1º frame enquanto o vídeo carrega)

Para alternar entre imagem e vídeo, mude apenas `background.type` para
`'image'` ou `'video'`.

Dicas para o vídeo:
- Mantenha o arquivo leve (idealmente < 5 MB) e em `.mp4` (H.264) para tocar
  em todos os navegadores.
- Use `background.overlay` (0 a 1) para escurecer o fundo e manter o texto legível.
