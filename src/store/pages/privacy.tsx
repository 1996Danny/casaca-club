export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Política de Privacidad y Protección de Datos Personales
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Conforme a la Ley 25.326 de Protección de los Datos Personales (Habeas Data) y su Decreto
          Reglamentario 1558/2001.
        </p>
      </header>

      <div className="flex flex-col gap-8">
        <article>
          <h2 className="text-lg font-semibold text-foreground">1. Responsable del tratamiento</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            El responsable de la base de datos es el equipo de Casaca Club. Contacto:{" "}
            <a
              href="mailto:hola@casacaclub.com"
              className="text-primary underline-offset-2 hover:underline"
            >
              hola@casacaclub.com
            </a>
            .
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-foreground">2. Datos recolectados</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Para procesar un pago se solicitan los datos que Mercado Pago requiere en su propio
            checkout (nombre, correo electrónico y medio de pago). Casaca Club no almacena datos de
            tarjetas ni medios de pago: esa información es procesada directamente por Mercado Pago.
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-foreground">3. Finalidad del tratamiento</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Los datos se utilizan con el único fin de procesar el pedido y su pago. No se usan con
            fines comerciales, publicitarios ni de elaboración de perfiles, y no se ceden a terceros
            salvo a Mercado Pago para completar la transacción (arts. 4 y 11 de la Ley 25.326).
          </p>
        </article>

        <article>
          <h2 className="text-lg font-semibold text-foreground">
            4. Mecanismos de protección del lado del cliente
          </h2>
          <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              El carrito de compras se guarda únicamente en el navegador del usuario mientras navega el
              sitio.
            </li>
            <li>
              El pago se procesa en los servidores de Mercado Pago, no en este sitio; Casaca Club nunca
              ve ni guarda los datos de la tarjeta.
            </li>
            <li>Principio de minimización: sólo se piden los datos estrictamente necesarios.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">5. Derechos ARCO</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            El titular de los datos puede ejercer en forma gratuita los siguientes derechos escribiendo
            al correo de contacto:
          </p>
          <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-foreground">Acceso:</strong> conocer qué datos suyos se tratan
              (art. 14).
            </li>
            <li>
              <strong className="text-foreground">Rectificación:</strong> corregir datos inexactos o
              incompletos (art. 16).
            </li>
            <li>
              <strong className="text-foreground">Cancelación:</strong> solicitar la supresión de sus
              datos (art. 16).
            </li>
            <li>
              <strong className="text-foreground">Oposición:</strong> oponerse al tratamiento o revocar
              el consentimiento otorgado (art. 27).
            </li>
          </ul>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Las solicitudes de rectificación o supresión se responden dentro de los 5 días hábiles de
            recibidas; las de acceso, dentro de los 10 días corridos.
          </p>
        </article>

        <article className="rounded-xl border border-border bg-muted/40 p-6">
          <h2 className="text-lg font-semibold text-foreground">6. Aviso legal obligatorio</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los
            mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un
            interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N°
            25.326. La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control
            de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan
            quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en
            materia de protección de datos personales.
          </p>
        </article>
      </div>
    </div>
  );
}
