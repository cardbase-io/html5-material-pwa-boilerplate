
/*
for material components

- install material component - no need in our case cause we installed for all material-web-components
- import - such as - import { MDCRipple } from '@material/ripple/index';
- assosiate w/ DOM element - such as - const ripple = new MDCRipple(document.querySelector('.foo-button'));
 */
import {MDCRipple} from '@material/ripple/index';

[].slice.call(document.querySelectorAll('.mdc-button'))
                      .forEach(function(ele) {
                          MDCRipple.attachTo(ele);
                      });


/* 
Adjust dynamic routing: when you click Get Started button, you need to redirect to core-app link considering dev, 
release, demo and prod!
*/
function parseDomainName(url) {
  let a  = document.createElement('a');

  a.href = url;

  return a.hostname;
}

const domainName = parseDomainName(window.document.URL);
const hostName = domainName.substr(domainName.indexOf('.'));

const route = {'development': 'https://core-app-3f127.firebaseapp.com',
              'release': 'https://core-app-91f9d.firebaseapp.com',
              'demon': 'define a url', //demo :)
              'www': 'https://core-app.cardbase.io', // production
              'localhost': 'https://core-app-3f127.firebaseapp.com',  // route 2 development, why not
              'learnMore': '/learn-more-about-......html'      //define naming b/w your idea and SEO
              }


document.querySelector('.getStarted')
        .addEventListener('click', ()=> {
            console.log('clicked to getStarted');
            console.log(window.document.URL);

            if (domainName.startsWith('development')) {
              console.log('environment = development');
              console.log(route.development);

              window.open(route.development);         
            }
            else if(domainName.startsWith('release')) {
              console.log('environment = release');

              window.open(route.release); 
            }
            else if(domainName.startsWith('demo') ||
                    domainName.startsWith('demon')) {
              console.log('environment = demo');

              window.open(route.demo);
            }
            else if(domainName.startsWith('www')) {
              console.log('environment = production');

              window.open(route.www);
            }
            else if(domainName.startsWith('localhost')) {
              console.log('environment = localhost, core-app will be routed to development env');

              window.open(route.localhost);
            }
        });
  
/*
Normally, when you clicked requestDemo, we should get user information for lead management, then redirect to  
demo environment.

there are many ways to do it.
1- mailchimp - add its form, then store as marketing-list, then redirect ??
2- crm system - add its form, then store as a deal, then redirect ??

this part will always redirect to demo environment!
 */
document.querySelector('.requestDemo')
        .addEventListener('click', ()=> {
            console.log('clicked to requestDemo');

            window.open(route.demo);
        });

document.querySelector('.learnMore')
        .addEventListener('click', () => {
            console.log('clicked to learnMore');

            window.open(route.learnMore);
        });        
