/** The wrapper the theme lives on. The site's <html> is forced dark, so v6 scopes its own. */
export const V6_ROOT_ID = "v6-root";
export const THEME_KEY = "theme";

/**
 * Runs inline, before first paint: a stored choice wins, otherwise the OS
 * setting. Server HTML ships data-theme="dark"; this corrects it in place.
 */
export const THEME_SCRIPT = `(function(){try{var r=document.getElementById(${JSON.stringify(
  V6_ROOT_ID,
)});if(!r)return;var t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)})}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}r.setAttribute("data-theme",t)}catch(e){}})();`;
