/**
 * HomePage
 *
 * Minimal home page for the application.
 *
 * @returns JSX.Element representing the Home page
 */
export function HomePage() {
  return (
    <main
      className="bg-surface text-text-primary min-h-screen"
      id="main-content"
    >
      <div className="container">
        <h1 className="text-primary">Welcome</h1>
        <p>Your application is ready.</p>
      </div>
    </main>
  );
}
