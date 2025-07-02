import { renderListWithTemplate } from "./utils.mjs";

export default class Alert {
  constructor(dataSource, htmlElement) {
    this.dataSource = dataSource;
    this.htmlElement = htmlElement;
  }

  async init() {
    const alerts = await this.dataSource.getData();
    renderListWithTemplate(
      alertTemplate,
      this.htmlElement,
      alerts,
      "beforebegin",
      false,
    );
  }
}
function alertTemplate(alert) {
  return `
    <section style="color: ${alert.color}; background: ${alert.background}" class="alert-list"> 
        <p s>${alert.message}</p>
    </section>
    `;
}
