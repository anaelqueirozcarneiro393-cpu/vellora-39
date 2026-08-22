import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-xl">
        <span className="eyebrow">VELLÒRA / 404</span>
        <h1 className="mt-6 font-serif text-5xl tracking-tight sm:text-7xl">Ops! Essa página não existe.</h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">Mas podemos criar uma para o seu negócio.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground active:translate-y-0" href="/">Voltar para o início <ArrowUpRight className="size-4" /></Link>
          <a className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-border px-6 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground" href="https://wa.me/SEU_NUMERO?text=Ol%C3%A1%21%20Conheci%20a%20Vellora%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20cria%C3%A7%C3%A3o%20de%20uma%20landing%20page%20para%20o%20meu%20neg%C3%B3cio." target="_blank" rel="noreferrer">Falar com a Vellora <ArrowUpRight className="size-4" /></a>
        </div>
      </div>
    </main>
  )
}
