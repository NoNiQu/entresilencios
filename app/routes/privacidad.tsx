import {
  InformationPageLayout,
  InformationSection,
} from "~/components/layout/InformationPageLayout";
import { siteConfig } from "~/config/site";
import { CopyEmailInline } from "~/components/CopyEmailInline";

export function meta() {
  return [
    {
      title: "Privacidad | Entre Silencios",
    },
    {
      name: "description",
      content:
        "Información sobre el tratamiento de datos personales en Entre Silencios.",
    },
  ];
}

export default function PrivacidadPage() {
  return (
    <InformationPageLayout title="Política de privacidad">
      <InformationSection title="1. Responsable del tratamiento">
        <dl className="grid gap-3">
          <div>
            <dt className="font-medium text-black">Responsable</dt>
            <dd>{siteConfig.owner}</dd>
          </div>

          <div>
            <dt className="font-medium text-black">Proyecto</dt>
            <dd>{siteConfig.name}</dd>
          </div>

          <div>
            <dt className="font-medium text-black">Correo electrónico</dt>
            <dd className="mt-1">
              <CopyEmailInline />
            </dd>
          </div>
        </dl>
      </InformationSection>

      <InformationSection title="2. Datos tratados">
        <p>
          Entre Silencios no requiere registro, no dispone de cuentas de usuario
          y no solicita datos personales para consultar sus contenidos.
        </p>

        <p>
          Cuando una persona contacta voluntariamente con el proyecto, podrán
          tratarse su dirección de correo electrónico, el nombre que facilite y
          el contenido de la comunicación.
        </p>

        <p>
          Cuando una persona, fotógrafo, cofradía, hermandad o entidad colabora
          facilitando fotografías u otros materiales, podrán tratarse los datos
          necesarios para identificar su procedencia, gestionar la colaboración
          y acreditar, cuando corresponda, la autorización para utilizar dichos
          materiales.
        </p>

        <p>
          Cuando proceda, el nombre, denominación, alias o logotipo facilitado
          por la persona o entidad colaboradora podrá mostrarse públicamente
          como crédito o identificación de la procedencia del material.
        </p>

        <p>
          La base de datos utilizada por Entre Silencios contiene principalmente
          información relativa a cofradías, procesiones, titulares, sedes,
          horarios, recorridos y otros contenidos propios de la guía. No se
          utiliza para crear cuentas de usuario ni almacenar perfiles de los
          visitantes.
        </p>

        <p>
          Los proveedores técnicos necesarios para el funcionamiento de la web
          también pueden generar registros de acceso y seguridad, como la
          dirección IP, el navegador, la fecha y la hora de la solicitud.
        </p>
      </InformationSection>

      <InformationSection title="3. Finalidades">
        <p>Los datos se utilizarán exclusivamente para:</p>

        <ul className="space-y-3">
          <li className="flex gap-4">
            <span aria-hidden="true">—</span>
            <span>
              Leer, responder y gestionar las comunicaciones recibidas.
            </span>
          </li>

          <li className="flex gap-4">
            <span aria-hidden="true">—</span>
            <span>
              Comprobar correcciones, incidencias o solicitudes relacionadas con
              los contenidos.
            </span>
          </li>

          <li className="flex gap-4">
            <span aria-hidden="true">—</span>
            <span>
              Gestionar colaboraciones, autorizaciones, procedencia y créditos
              de fotografías u otros materiales facilitados al proyecto.
            </span>
          </li>

          <li className="flex gap-4">
            <span aria-hidden="true">—</span>
            <span>
              Mantener la seguridad, disponibilidad y funcionamiento técnico del
              sitio.
            </span>
          </li>

          <li className="flex gap-4">
            <span aria-hidden="true">—</span>
            <span>Cumplir posibles obligaciones legales.</span>
          </li>
        </ul>

        <p>
          Los datos no se utilizarán para publicidad, elaboración de perfiles
          comerciales, envío de comunicaciones promocionales ni venta de datos a
          terceros.
        </p>
      </InformationSection>

      <InformationSection title="4. Base jurídica">
        <p>
          La gestión de las comunicaciones recibidas se basa en el interés
          legítimo del responsable en atender las consultas, correcciones,
          propuestas o comunicaciones que las personas dirijan voluntariamente
          al proyecto.
        </p>

        <p>
          La gestión de colaboraciones y materiales facilitados al proyecto se
          basa en la relación establecida voluntariamente con la persona o
          entidad colaboradora y en el interés legítimo de documentar la
          procedencia y, cuando corresponda, la autorización de uso de dichos
          materiales.
        </p>

        <p>
          La protección y el mantenimiento técnico de la web se basan en el
          interés legítimo de garantizar su seguridad, disponibilidad y correcto
          funcionamiento.
        </p>

        <p>
          Cuando resulte necesario, determinados tratamientos también podrán
          realizarse para cumplir obligaciones legales aplicables.
        </p>
      </InformationSection>

      <InformationSection title="5. Conservación">
        <p>
          Los mensajes y los datos relacionados se conservarán durante el tiempo
          necesario para gestionar la comunicación y atender las cuestiones
          planteadas.
        </p>

        <p>
          Posteriormente podrán conservarse durante el tiempo necesario para
          atender posibles obligaciones o responsabilidades legales.
        </p>

        <p>
          Cuando una comunicación sirva para acreditar una autorización, cesión,
          procedencia o colaboración relacionada con fotografías u otros
          contenidos publicados en Entre Silencios, podrá conservarse mientras
          resulte necesario acreditar dicha autorización o colaboración.
        </p>

        <p>
          Cuando los datos dejen de ser necesarios para las finalidades para las
          que fueron tratados y no exista una obligación que justifique su
          conservación, serán eliminados.
        </p>
      </InformationSection>

      <InformationSection title="6. Destinatarios y proveedores">
        <p>
          Los datos no se venden ni se comunican a terceros con fines
          comerciales.
        </p>

        <p>
          Para alojar y hacer funcionar la web se utilizan servicios
          tecnológicos como Vercel y Supabase. Estos proveedores pueden tener
          acceso a determinados datos técnicos cuando resulte necesario para
          prestar sus servicios.
        </p>

        <p>
          Cuando corresponda y exista una colaboración relacionada con
          fotografías u otros materiales, el nombre, denominación, alias o
          logotipo facilitado podrá mostrarse públicamente como crédito de
          autoría, procedencia o colaboración.
        </p>

        <p>
          También podrán comunicarse datos cuando exista una obligación legal o
          un requerimiento válido de una autoridad competente.
        </p>
      </InformationSection>

      <InformationSection title="7. Transferencias internacionales">
        <p>
          Algunos proveedores tecnológicos pueden tratar información fuera del
          Espacio Económico Europeo.
        </p>

        <p>
          Cuando resulte aplicable, esos tratamientos se realizarán mediante las
          garantías reconocidas por la normativa de protección de datos y las
          condiciones contractuales ofrecidas por cada proveedor.
        </p>
      </InformationSection>

      <InformationSection title="8. Derechos">
        <p>
          Puedes solicitar el acceso, rectificación o supresión de tus datos,
          así como la limitación u oposición al tratamiento cuando resulte
          aplicable.
        </p>

        <p>
          También puedes solicitar la portabilidad de tus datos cuando concurran
          los requisitos establecidos por la normativa.
        </p>

        <p>
          Para ejercer tus derechos, escribe a{" "}
          <span className="font-medium text-black decoration-black/30 underline-offset-4">
            {siteConfig.email}
          </span>
          , indicando claramente tu solicitud.
        </p>

        <p>
          También puedes presentar una reclamación ante la Agencia Española de
          Protección de Datos cuando consideres que el tratamiento no respeta la
          normativa aplicable.
        </p>
      </InformationSection>

      <InformationSection title="9. Cookies y seguimiento">
        <p>
          Entre Silencios no utiliza actualmente cookies de analítica,
          publicidad, personalización o seguimiento.
        </p>

        <p>
          Tampoco utiliza herramientas destinadas a elaborar perfiles de
          navegación o mostrar publicidad personalizada.
        </p>

        <p>
          Esta política se actualizará si en el futuro se incorporan tecnologías
          que modifiquen esta situación.
        </p>
      </InformationSection>

      <InformationSection title="10. Cambios en la política">
        <p>
          Esta política podrá actualizarse cuando cambien las funcionalidades de
          la web, los proveedores utilizados o las obligaciones legales
          aplicables.
        </p>

        <p>Última actualización: septiembre de 2026.</p>
      </InformationSection>
    </InformationPageLayout>
  );
}
