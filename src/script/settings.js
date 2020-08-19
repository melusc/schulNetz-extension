const getVal = str => document.getElementById(str).value;

const data = browser.storage.local.get([
  'url',
  'password',
  'username',
  'ignoring',
]);
data.then(vals => {
  const keys = Object.entries(vals);
  for (let i = 0; i < keys.length; i++) {
    const [key, val] = keys[i];
    document.getElementById(key).value = Array.isArray(val)
      ? val.join(', ')
      : val;
  }
});

const checkValidity = () => {
  const data = browser.storage.local.get(['url', 'password', 'username']);
  data.then(
    ({ password: origPassword, username: origUsername, url: origUrl }) => {
      const password = getVal('password');
      const username = getVal('username');
      const url = getVal('url');
      const ignoring = getVal('ignoring')
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(e => e !== '');
      if (
        password === origPassword &&
        username === origUsername &&
        origUrl === url
      ) {
        browser.storage.local.set({ ignoring });
        message(true);
      } else if (password !== '' && username !== '' && ignoring !== '') {
        const loginhash = fetch(
          `https://www.schul-netz.com/${url}/loginto.php?mode=0&lang=`
        )
          .then(e => e.text())
          .then(e => {
            const parsed = new DOMParser().parseFromString(e, 'text/html');
            return parsed.querySelector('input[name="loginhash"]');
          });
        loginhash.then(hash => {
          if (hash !== null) {
            fetch(`https://www.schul-netz.com/${url}/index.php?pageid=`, {
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
                if (anchor !== null) {
                  browser.storage.local.set({
                    url,
                    password,
                    username,
                    ignoring,
                  });
                  message(true);
                } else {
                  message(false);
                }
              });
          } else {
            message(false);
          }
        });
      } else {
        message(false);
      }
    }
  );
};

const message = saved => {
  const origSaveBtn = document.getElementById('save');
  origSaveBtn.classList.remove('saved', 'failed');

  const saveBtn = origSaveBtn.cloneNode(true);
  saveBtn.addEventListener('click', checkValidity);
  origSaveBtn.replaceWith(saveBtn);

  saveBtn.textContent = saved ? '✓' : '✗';
  saveBtn.classList.add(saved ? 'saved' : 'failed');
  saveBtn.addEventListener('animationend', messageAnimationend);
};

const messageAnimationend = () => {
  const messageEl = document.getElementById('save');
  messageEl.classList.remove('saved', 'failed');
  messageEl.textContent = 'Save';
};

document.getElementById('save').addEventListener('click', checkValidity);

document.getElementById('inputs').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.stopPropagation();
    checkValidity();
  }
});
