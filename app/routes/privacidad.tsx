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
          Cuando una persona contacta voluntariamente por correo electrónico,
          podrán tratarse su dirección de correo, el nombre que facilite y el
          contenido del mensaje.
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
          comerciales ni envío de comunicaciones promocionales.
        </p>
      </InformationSection>

      <InformationSection title="4. Base jurídica">
        <p>
          La gestión de las comunicaciones se basa en la solicitud realizada
          voluntariamente por la persona que contacta con el proyecto.
        </p>

        <p>
          La protección y el mantenimiento técnico de la web se basan en el
          interés legítimo de garantizar su seguridad y correcto funcionamiento.
        </p>
      </InformationSection>

      <InformationSection title="5. Conservación">
        <p>
          Los mensajes y datos relacionados se conservarán durante el tiempo
          necesario para responder y gestionar la consulta.
        </p>

        <p>
          Posteriormente podrán conservarse durante los plazos necesarios para
          atender posibles obligaciones o responsabilidades legales. Cuando ya
          no sean necesarios, serán eliminados.
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
          Cuando resulte aplicable, esos tratamientos deberán realizarse
          mediante las garantías reconocidas por la normativa de protección de
          datos y las condiciones contractuales ofrecidas por cada proveedor.
        </p>
      </InformationSection>

      <InformationSection title="8. Derechos">
        <p>
          Puedes solicitar el acceso, rectificación o supresión de tus datos,
          así como la limitación u oposición al tratamiento cuando resulte
          aplicable.
        </p>

        <p>
          También puedes retirar el consentimiento otorgado, sin que ello afecte
          a la licitud del tratamiento realizado anteriormente.
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

        <p>Última actualización: agosto de 2026.</p>
      </InformationSection>
    </InformationPageLayout>
  );
}
