import { useFetcher } from "react-router";

interface EmailFormProps {
  action?: string;
  className?: string;
}

export function EmailForm({
  action = "/api/subscribe",
  className = "",
}: EmailFormProps) {
  const fetcher = useFetcher();
  const isLoading = fetcher.state === "submitting";
  const actionData = fetcher.data;
  const isSuccess = actionData?.success;

  return (
    <div className={className}>
      <fetcher.Form method="post" action={action}>
        <div className="space-y-2">
          {/* Honeypot field - hidden from users, bots will fill it */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute opacity-0 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            disabled={isLoading}
            className="w-full pr-2 py-1 text-sm bg-transparent border-b border-black text-black placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
            aria-label="Name"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            disabled={isLoading}
            className="w-full pr-2 py-1 text-sm bg-transparent border-b border-black text-black placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-3 py-1 text-sm text-black border border-black hover:italic transition-all disabled:opacity-50 disabled:hover:not-italic mt-3"
          >
            Subscribe
          </button>
        </div>
      </fetcher.Form>
      {isSuccess && actionData?.message && (
        <p className="text-xs text-black italic mt-4">{actionData.message}</p>
      )}
      {actionData?.error && !isSuccess && (
        <p className="text-xs text-black mt-4">{actionData.error}</p>
      )}
    </div>
  );
}
