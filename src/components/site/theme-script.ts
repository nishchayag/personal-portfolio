export const THEME_KEY = "theme";

/**
 * Runs inline, before first paint: a stored choice wins, otherwise the OS
 * setting. Server HTML ships data-theme="dark" on <html>; this corrects it
 * in place before the browser paints anything.
 */
export const THEME_SCRIPT = `(function(){try{var d=document.documentElement;var t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)})}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.setAttribute("data-theme",t)}catch(e){}})();`;
