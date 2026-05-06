import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "react-email";

interface ResetPasswordEmailTemplateProps {
  username: string;
  url: string;
}

export default function ResetPasswordEmailTemplate({
  username,
  url,
}: ResetPasswordEmailTemplateProps) {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              brand: "oklch(0.443 0.11 240.79)",
              background: "oklch(0.145 0 0)",
              secondary: "oklch(0.274 0.006 286.033)",
              border: "oklch(1 0 0 / 10%)",
            },
          },
        },
      }}
    >
      <Html>
        <Head>
          <Font
            fontFamily="JetBrains Mono"
            fallbackFontFamily="monospace"
            webFont={{
              url: "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbV2o-flEEny0FZhsfKu5WU4xD7OwE.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Reset your password if yout forgot the old one</Preview>
        <Body className="bg-background py-10">
          <Container className="m-auto max-w-sm text-center sm:max-w-xl">
            <Section className="border border-zinc-700 rounded-lg bg-secondary p-5">
              <Row>
                <Heading
                  as="h1"
                  className="mt-0 mb-5 text-2xl font-bold text-brand"
                >
                  Hi {username.split(/\s/)[0]}
                </Heading>

                <Text className="m-5 text-gray-200">
                  If your requested a password reset please click the button below to proceed. If you didn&apos;t send this
                  request please ignore this mail.
                </Text>

                <Button
                  href={url}
                  className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-secondary"
                >
                  Reset Password
                </Button>
              </Row>
            </Section>
            <Section>
              <Row>
                <Text className="text-gray-500">Better Auth 2026</Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

ResetPasswordEmailTemplate.PreviewProps = {
  username: "Juan José Rodriguez",
  url: "https://google.com",
} satisfies ResetPasswordEmailTemplateProps;
