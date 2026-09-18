import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, assunto, mensagem, turnstileToken } = body;

    // 1. Verificar o token com a API da Cloudflare
    const verifyFormData = new FormData();
    verifyFormData.append('secret', 'A_TUA_SECRET_KEY_PRIVADA_AQUI');
    verifyFormData.append('response', turnstileToken);

    const cloudflareResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: verifyFormData,
    });

    const cloudflareData = await cloudflareResponse.json();

    // 2. Se a Cloudflare disser que é um bot, bloqueamos imediatamente (Erro 403)
    if (!cloudflareData.success) {
      return NextResponse.json({ error: 'Falha na verificação de segurança (Bot detetado)' }, { status: 403 });
    }

    console.log("Nova mensagem de:", nome, email);
    
    return NextResponse.json({ message: 'Mensagem enviada com sucesso!' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}