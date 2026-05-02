import { GoogleIcon } from "../icons/GoogleIcon";
import { Button } from "../ui/button";

export default function GoogleBtn({ loading }: { loading: boolean }) {
  return (
    <Button type="button" variant="outline" disabled={loading}>
      <GoogleIcon />
      Sign in with Google
    </Button>
  );
}
