import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const recipient = 'anaelqueirozcarneiro393@gmail.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const fields = {
      Nome: body.nome,
      'Nome do negócio': body.negocio,
      Segmento: body.segmento,
      WhatsApp: body.whatsapp,
      Gmail: body.gmail,
      Telefone: body.telefone,
      Instagram: body.instagram,
      Necessidade: body.necessidade,
      'Site ou cardápio atual': body.site,
      'Possui domínio': body.dominio,
      Mensagem: body.mensagem,
    }

    if (!fields.Nome || !fields['Nome do negócio'] || !fields.WhatsApp) {
      return NextResponse.json({ error: 'Preencha os campos obrigatórios.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const html = Object.entries(fields)
      .filter(([, value]) => value)
      .map(([label, value]) => `<p><strong>${label}:</strong> ${String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char)}</p>`)
      .join('')

    const { error } = await resend.emails.send({
      from: 'Vellora Leads <onboarding@resend.dev>',
      to: recipient,
      subject: `Novo lead: ${fields['Nome do negócio']}`,
      html: `<h2>Novo briefing recebido pelo site Vellora</h2>${html}`,
    })

    if (error) return NextResponse.json({ error: 'Não foi possível enviar o briefing.' }, { status: 502 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Não foi possível enviar o briefing.' }, { status: 500 })
  }
}
