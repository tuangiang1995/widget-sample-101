import {html, css, LitElement} from 'lit';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
// === Add this import statement ===
import '@shoelace-style/shoelace/dist/components/icon/icon.js'; 

// Set the base path (make sure this path is correct for your setup)
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/');

const SECURE_QUEUE_NAME = "SecureChat";

export class HeaderWidget extends LitElement {
  static get styles() {
    return css`
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

      .rss-widget {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 75px;
        height: 60px;
        overflow: hidden;
        border: 1px solid #ccc;
        background-color: #290f87;
        color: var(--text-color, white);
        --link-color: blue;
        --link-color-dark: lightblue;
        
        /* === Add these two lines for the pillbox shape === */
        border-radius: 30px; /* Half of the height (60px / 2) */
        padding: 0 20px; /* Optional: add horizontal padding to prevent content from touching the edges */
      }

      .title {
        flex: 1;
        margin: 0 10px;
        overflow: hidden;
        font-family: 'Roboto', sans-serif;
        text-overflow: ellipsis;
        display: inline-block;
        animation: scroll 10s linear infinite; 
      }
      .title-container {
        overflow: hidden;
      }
      .feed-title {
        text-align: center;
      }
      .feed-items {
        display: flex;
      }
      button {
        margin: 0 5px;
      }
      @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }

      /* Dark mode styles */
      .rss-widget.dark {
        background-color: black;
        color: white;
        --link-color: var(--link-color-dark);
      }

      a {
        color: var(--link-color);
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `;
  }

  static get properties() {
    return {
      rss: { attribute: "rss", type: String},
      currentItemIndex: { type: Number },
      items: { type: Array },
      dark: { attribute: "dark", type: Boolean },
      agent: { attribute: "agent", type: String},
      virtualTeamName: { attribute: "virtualTeamName", type: String},
      QueueId: { attribute: "QueueId", type: String},
      state: { attribute: "state", type: String},
      cad:   { attribute: "cad", type: Object},
      currentTime: { type: String }, 
      queue: { type: String},
    }
  };

  constructor() {
    super();
    this.dark = false;
    this.rss  = 'https://developer.webex.com/api/content/blog/feed';
    this.name = 'SECURE CHAT'
    this.items = [];
    this.currentItemIndex = 0;
    this.feed = {};
    this.agent = '';
    this.QueueId = 'Test';
    this.queue   = "";
    this.cad     = Object; 
    this.state   = 'state';
    this.currentTime = new Date().toLocaleTimeString();
  }

  // Lifecycle method called when the component is added to the DOM
  connectedCallback() {
    super.connectedCallback();
    //console.log('Component added to the DOM. Starting timer.');
    // Initial render 
    //this.updateContent();
    this.render();
    // Start a timer to call updateContent() every 3000 milliseconds (3 seconds)
    this.intervalId = setInterval(() => {
      //console.log("Rendering...");
      //console.log("QueueInfo is ", this.queueInfo());
      this.queue = this.queueInfo();
      //console.log("TUAN -- ", this.queue);
      this.currentTime = new Date().toLocaleTimeString();
      this.render();
    }, 3000);
  }
  

  // This method will be called whenever the rssFeed property changes.
  async updated(changedProperties) {
    if (changedProperties.has('rss')) {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(this.rss)}`);
      const data = await response.json();
      this.items = data.items;
      this.feed = data.feed;
    }
    // if (changedProperties.has('cad')){
    //   console.log("Property CAD has Changed");
    //   if (this.queueInfo() == "Q_TUAN"){
    //     this.name = "CALL IS IN Q_TUAN";
    //   }else{
    //     this.name = "CALL IS NOT IN Q_TUAN";
    //   }
    // }
  }

  mediaInfo() {
    const info = this.cad;
    for (const iterator of info) {
      const media = iterator[1].interaction.media;
      const response = Object.keys(media).map(info => {
        return media[info];
      });
      return response;
    }
  }

  queueInfo() {
    const info = this.cad;
    for (const iterator of info) {
      const callProcessingDetails = iterator[1].interaction.callProcessingDetails;
      //console.log("TUAN--", callProcessingDetails)
      const response = Object.keys(callProcessingDetails).map(info => {
        return callProcessingDetails[info];
      });
      //console.log("TUAN[16] --", response[16]);
      return response[16];
    }
  }


  render(){
    //const currentTime = new Date().toLocaleTimeString();
    //console.log(currentTime);
    if (this.queue == SECURE_QUEUE_NAME){
      return html`
        <div class="rss-widget ${this.dark && "dark"}">
          <div class="feed-items">
            <div>
              <div class="title-container">
                <p class="title"> 
                  <sl-icon name="shield-check"></sl-icon> SECURE CHAT  
                  <sl-icon name="shield-check"></sl-icon> SECURE CHAT <sl-icon name="shield-check"> </sl-icon>  
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
      }else{
        return html``;
      }
    }
}
customElements.define('header-widget', HeaderWidget);
