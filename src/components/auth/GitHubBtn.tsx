import { GitHubIcon } from "../icons/GitHubIcon";
import { Button } from "../ui/button";

export default function GitHubBtn() {
  return (
    <Button type="button" variant="outline">
      <GitHubIcon />
      Sign in with GitHub
    </Button>
  );
}
