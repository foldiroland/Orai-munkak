const honapok = new Array(13);
// ... ide másold be a honapok tömb teljes tartalmát, amit korábban megadtál ...

// Segédfüggvény
function getNevnap(ev, honap, nap) {
  if (!honapok[honap]) return '';
  return honapok[honap][nap] || '';
}

function keresNevhezDatum(keresettNev) {
  const ev = new Date().getFullYear();
  for (let honap = 1; honap <= 12; honap++) {
    for (let nap = 1; nap < honapok[honap].length; nap++) {
      const nevek = honapok[honap][nap];
      if (nevek && nevek.toLowerCase().includes(keresettNev.toLowerCase())) {
        return { honap, nap, nevek };
      }
    }
  }
  return null;
}

function nevNapMondat(nevek, keresettNev = null) {
  if (!nevek) return "Nem található névnap.";
  if (keresettNev && nevek.includes(" és ")) {
    const masodikNev = nevek.split(" és ").filter(n => !n.toLowerCase().includes(keresettNev.toLowerCase()))[0];
    return Ezen a napon van ${masodikNev} névnapja is.;
  }
  return Ezen a napon van ${nevek} névnapja.;
}

// Események
document.addEventListener('DOMContentLoaded', () => {
  const nevInput = document.getElementById('nev');
  const datumInput = document.getElementById('datum');
  const keresGomb = document.getElementById('keresGomb');
  const aktualisGomb = document.getElementById('aktualisGomb');
  const eredmenyDiv = document.getElementById('eredmeny');

  keresGomb.addEventListener('click', () => {
    const nev = nevInput.value.trim();
    if (nev) {
      const datum = keresNevhezDatum(nev);
      if (datum) {
        const datumString = ${new Date().getFullYear()}-${String(datum.honap).padStart(2, '0')}-${String(datum.nap).padStart(2, '0')};
        datumInput.value = datumString;
        eredmenyDiv.textContent = nevNapMondat(datum.nevek, nev);
      } else {
        eredmenyDiv.textContent = "Nem található ilyen nevű személy névnapja.";
      }
    }
  });

  aktualisGomb.addEventListener('click', () => {
    const today = new Date();
    const nevnap = getNevnap(today.getFullYear(), today.getMonth() + 1, today.getDate());
    datumInput.value = today.toISOString().split('T')[0];
    eredmenyDiv.textContent = nevNapMondat(nevnap);
  });

  datumInput.addEventListener('change', () => {
    const d = new Date(datumInput.value);
    const nevnap = getNevnap(d.getFullYear(), d.getMonth() + 1, d.getDate());
    eredmenyDiv.textContent = nevNapMondat(nevnap);
  });
});
