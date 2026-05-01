import { GoogleIcon } from "../icons/GoogleIcon";
import { Button } from "../ui/button";

export default function GoogleBtn() {
  return (
    <Button type="button" variant="outline">
      <GoogleIcon />
      Sign in with Google
    </Button>
  );
}
