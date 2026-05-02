import { GitHubIcon } from "../icons/GitHubIcon";
import { Button } from "../ui/button";

export default function GitHubBtn({ loading }: { loading: boolean }) {
  return (
    <Button type="button" variant="outline" disabled={loading}>
      <GitHubIcon />
      Sign in with GitHub
    </Button>
  );
}
