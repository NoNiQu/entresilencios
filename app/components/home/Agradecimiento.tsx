export function Agradecimientos() {
  return (
    <section
      aria-labelledby="agradecimientos-title"
      className="bg-white text-black"
    >
      <div className="mx-auto max-w-360 px-6 pt-20 pb-20 md:px-10 md:py-28 lg:px-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2
              id="agradecimientos-title"
              className="text-[2.6rem] font-normal leading-[1.02] tracking-[-0.03em] md:text-6xl md:leading-[0.98]"
            >
              Agradecimientos
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base leading-7 text-black/75 md:text-lg md:leading-8">
              A todas las personas que han probado la web, compartido sus
              impresiones, señalado errores y ayudado a mejorarla poco a poco.
            </p>

            <p className="mt-5 text-base leading-7 text-black/75 md:text-lg md:leading-8">
              Y, especialmente, a quienes me animaron a sacar adelante esta idea
              y estuvieron ahí durante todo el proceso. Entre Silencios también
              tiene un poco de vosotros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
