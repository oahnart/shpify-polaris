import "./App.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { HashRouter } from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <HashRouter>
        <Routes />
      </HashRouter>
    </AppProvider>
  );
}

export default App;
