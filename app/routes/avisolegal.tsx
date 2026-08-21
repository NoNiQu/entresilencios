import {
  InformationPageLayout,
  InformationSection,
} from "~/components/layout/InformationPageLayout";
import { siteConfig } from "~/config/site";
import { CopyEmailInline } from "~/components/CopyEmailInline";

export function meta() {
  return [
    {
      title: "Aviso legal | Entre Silencios",
    },
    {
      name: "description",
      content:
        "Información legal, titularidad y condiciones de uso de Entre Silencios.",
    },
  ];
}

export default function AvisoLegalPage() {
  return (
    <InformationPageLayout title="Aviso legal">
      <InformationSection title="1. Titularidad del sitio">
        <dl className="grid gap-3">
          <div>
            <dt className="font-medium text-black">Proyecto</dt>
            <dd>{siteConfig.name}</dd>
          </div>

          <div>
            <dt className="font-medium text-black">Responsable</dt>
            <dd>{siteConfig.owner}</dd>
          </div>

          <div>
            <dt className="font-medium text-black">Correo electrónico</dt>
            <dd className="mt-1">
              <CopyEmailInline />
            </dd>
          </div>

          <div>
            <dt className="font-medium text-black">Sitio web</dt>
            <dd>{siteConfig.url}</dd>
          </div>
        </dl>
      </InformationSection>

      <InformationSection title="2. Naturaleza del proyecto">
        <p>
          Entre Silencios es un proyecto personal e independiente desarrollado
          como parte del portfolio de su autor.
        </p>

        <p>
          Además de mostrar el trabajo de diseño y desarrollo realizado, el
          proyecto pretende ofrecer una guía útil y accesible sobre la Semana
          Santa de Toledo.
        </p>
      </InformationSection>

      <InformationSection title="3. Carácter independiente y no oficial">
        <p>
          Entre Silencios no es una página oficial y no representa a la Junta de
          Cofradías, las hermandades y cofradías, el Ayuntamiento de Toledo, el
          Arzobispado de Toledo ni ninguna otra institución mencionada en sus
          contenidos.
        </p>

        <p>
          Cualquier vinculación, colaboración o autorización concreta se
          indicará expresamente cuando corresponda.
        </p>
      </InformationSection>

      <InformationSection title="4. Finalidad de la información">
        <p>
          Los contenidos publicados tienen una finalidad informativa,
          divulgativa y cultural.
        </p>

        <p>
          La web recopila y organiza información relacionada con cofradías,
          procesiones, titulares, horarios, recorridos, acompañamientos
          musicales, sedes canónicas y otros elementos de interés.
        </p>
      </InformationSection>

      <InformationSection title="5. Exactitud y actualización">
        <p>
          Se procura que la información publicada sea correcta y esté
          actualizada. No obstante, los horarios, recorridos y actos pueden
          modificarse por decisiones organizativas, circunstancias
          meteorológicas u otras causas.
        </p>

        <p>
          Antes de asistir a una procesión o acto, se recomienda comprobar la
          información mediante los canales oficiales de la entidad organizadora.
        </p>
      </InformationSection>

      <InformationSection title="6. Responsabilidad">
        <p>
          El responsable del proyecto no garantiza la ausencia absoluta de
          errores ni la disponibilidad ininterrumpida del sitio web.
        </p>

        <p>
          Entre Silencios no se responsabiliza de las decisiones adoptadas
          exclusivamente a partir de información desactualizada, incompleta o
          modificada posteriormente por las entidades organizadoras.
        </p>
      </InformationSection>

      <InformationSection title="7. Propiedad intelectual">
        <p>
          El diseño, la identidad visual, la estructura, el código y los textos
          originales desarrollados específicamente para Entre Silencios
          pertenecen a su autor, salvo que se indique otra titularidad.
        </p>

        <p>
          Las fotografías, escudos, marcas, nombres, logotipos y demás
          materiales pertenecientes a terceros conservan la titularidad y los
          derechos que correspondan a sus respectivos propietarios.
        </p>

        <p>
          Los materiales de terceros solo deberán utilizarse cuando exista
          autorización, una licencia válida o alguna otra base legal que permita
          su publicación.
        </p>
      </InformationSection>

      <InformationSection title="8. Fotografías y créditos">
        <p>
          Parte del material fotográfico publicado en Entre Silencios es de
          autoría propia del responsable del proyecto.
        </p>

        <p>
          Otras fotografías han sido facilitadas, cedidas o autorizadas para su
          utilización por cofradías, hermandades, entidades, fotógrafos u otras
          personas colaboradoras.
        </p>

        <p>
          Cuando corresponda, la autoría o procedencia de las imágenes se
          identificará mediante el nombre, denominación o logotipo de la persona
          o entidad que haya facilitado el material.
        </p>

        <p>
          La aparición de un nombre o logotipo como crédito fotográfico indica
          la procedencia o colaboración concreta relacionada con ese material y
          no implica necesariamente patrocinio, representación oficial ni
          vinculación institucional con Entre Silencios.
        </p>
      </InformationSection>

      <InformationSection title="9. Uso de inteligencia artificial">
        <p>
          Durante el diseño y desarrollo de Entre Silencios se han utilizado
          herramientas de inteligencia artificial generativa como apoyo en
          tareas de programación, revisión, redacción y desarrollo técnico del
          proyecto.
        </p>

        <p>
          El uso de estas herramientas tiene carácter auxiliar. Las decisiones
          finales sobre el diseño, el código, la estructura y los contenidos del
          sitio corresponden al responsable del proyecto.
        </p>

        <p>
          La información histórica, cultural y práctica publicada en Entre
          Silencios se procura contrastar con fuentes oficiales, institucionales
          o especializadas antes de su publicación.
        </p>
      </InformationSection>

      <InformationSection title="10. Enlaces externos">
        <p>
          La web puede contener enlaces a páginas oficiales y a otros sitios
          gestionados por terceros.
        </p>

        <p>
          Entre Silencios no controla la disponibilidad, seguridad, contenidos
          ni políticas de privacidad de esos sitios externos.
        </p>
      </InformationSection>

      <InformationSection title="11. Modificaciones">
        <p>
          Este aviso legal podrá actualizarse cuando cambien las
          funcionalidades, contenidos, proveedores o condiciones del proyecto.
        </p>
      </InformationSection>

      <InformationSection title="12. Legislación aplicable">
        <p>
          Este aviso legal se interpreta conforme a la legislación española que
          resulte aplicable.
        </p>

        <p>Última actualización: agosto de 2026.</p>
      </InformationSection>
    </InformationPageLayout>
  );
}
