const calcMark = (num = new Error('num is required')) => {
  num = parseFloat(num);
  return Math.round(num * 2) / 2;
};
class CustomElement {
  constructor(type, props = {}) {
    const element = document.createElement(type);
    const propEntries = Object.entries(props);
    for (let i = 0; i < propEntries.length; i++) {
      const [key, val] = propEntries[i];
      switch (key.toLowerCase()) {
        case 'textcontent':
        case 'innerhtml':
        case 'innertext':
        case 'value':
          element[key] = val;
          break;
        default:
          element.setAttribute(key, val);
          break;
      }
    }
    return element;
  }
}

const data = browser.storage.local.get([
  'url',
  'password',
  'username',
  'ignoring',
]);
data.then(({ url, password, username, ignoring }) => {
  if (url !== undefined && password !== undefined && username !== undefined) {
    const loginhash = fetch(
      `https://www.schul-netz.com/${url}/loginto.php?mode=0&lang=`
    )
      .then(e => e.text())
      .then(e => {
        const parsed = new DOMParser().parseFromString(e, 'text/html');
        return parsed.querySelector('input[name="loginhash"]');
      });

    const marksLink = loginhash.then(hash => {
      if (hash !== null) {
        return fetch(`https://www.schul-netz.com/${url}/index.php?pageid=`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `login=${username}&passwort=${encodeURIComponent(
            password
          )}&loginhash=${hash.value}`,
        })
          .then(e => e.text())
          .then(e => {
            const parsed = new DOMParser().parseFromString(e, 'text/html');
            const anchor = parsed.getElementById('menu21311');
            return anchor !== null
              ? `https://www.schul-netz.com/${url}/${anchor.getAttribute(
                  'href' // eslint-disable-line
                )}` // eslint-disable-line
              : null;
          });
      } else {
        document.getElementById('loading-bar').hidden = true;
        document.getElementById('logged-out').hidden = false;
      }
    });
    marksLink.then(link => {
      if (link !== null) {
        fetch(link)
          .then(e => e.text())
          .then(e => {
            const parsed = new DOMParser().parseFromString(e, 'text/html');
            const table = [...parsed.getElementsByTagName('h3')]
              .filter(e => /aktuelle noten/i.test(e.textContent))[0]
              .nextElementSibling.getElementsByTagName('table')[0];

            const rows = [...table.rows]
              .slice(1)
              .filter(e => e.style.display !== 'none')
              .filter(e => isFinite(e.children[3].textContent));

            const vals = rows
              .map(e => [
                e.firstElementChild.lastChild.textContent.trim(),
                calcMark(e.children[3].textContent),
              ])
              .filter(e => ignoring.indexOf(e[0]) === -1);

            if (vals.length <= 0) {
              document.getElementById('no-marks').hidden = false;
              document.getElementById('loading-bar').hidden = true;
              return;
            }

            const avg = vals.reduce(
              (acc, cur, index) =>
                index === vals.length - 1
                  ? (acc + cur[1]) / vals.length
                  : acc + cur[1],
              0
            );
            const avgEl = document.getElementById('avg');
            avgEl.textContent = avg.toFixed(3);
            avgEl.parentNode.style.color = avg < 4 ? 'red' : 'green';

            const compDub = vals.reduce(
              (acc, cur) => acc + (cur[1] - 4) * (cur[1] < 4 ? 2 : 1),
              0
            );

            const compDubEl = document.getElementById('comp-double');
            compDubEl.textContent = compDub;
            compDubEl.parentNode.style.color = compDub < 0 ? 'red' : 'green';

            const failingVals = vals.filter(e => e[1] < 4);

            const amountFailingEl = document.getElementById('amountFailing');
            amountFailingEl.textContent = failingVals.length;
            amountFailingEl.parentNode.style.color =
              failingVals.length > 3 ? 'red' : 'green';
            document.getElementById('amountPlural').hidden =
              failingVals.length === 1;

            if (failingVals.length === 0) {
              document.getElementById('failingBody').parentNode.hidden = true;
            } else {
              const failingBody = document.getElementById('failingBody');
              for (let i = 0; i < failingVals.length; i++) {
                const [name, mark] = failingVals[i];

                const row = new CustomElement('div', {
                  class: 'tr',
                });
                row.append(
                  new CustomElement('div', { textContent: name }),
                  new CustomElement('div', { textContent: mark.toFixed(1) })
                );
                failingBody.append(row);
              }
            }
            const marksBody = document.getElementById('marksBody');
            for (let i = 0; i < vals.length; i++) {
              const [name, mark] = vals[i];

              const row = new CustomElement('div', {
                class: 'tr',
              });
              row.append(
                new CustomElement('div', { textContent: name }),
                new CustomElement('div', { textContent: mark.toFixed(1) })
              );
              marksBody.append(row);
            }
            document.getElementById('amountMarks').textContent = vals.length;

            const summary = document.getElementById('summary');
            const summaryBool =
              avg >= 4 && compDubEl >= 0 && failingVals.length < 4;
            summary.textContent = summaryBool ? 'Passing' : 'Failing';
            summary.parentNode.style.color = summaryBool ? 'green' : 'red';

            document.getElementById('loading-bar').hidden = true;
            document.getElementById('loaded').hidden = false;
          });
      } else {
        document.getElementById('loading-bar').hidden = true;
        document.getElementById('logged-out').hidden = false;
      }
    });
  } else {
    document.getElementById('loading-bar').hidden = true;
    document.getElementById('logged-out').hidden = false;
  }
});
