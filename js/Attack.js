(function (global, factory) {
    if (typeof module !== "undefined" && module.exports) {
        //(Gitbash)
        const Weapon = require('./Weapon');
        module.exports = factory(Bron);
    } else {
        //(Przegladarka)
        global.Attack = factory(global.Bron);
    }
})(this, function (Bron) {
    //
});

//tylko wykonać rzut i przekazać wykinRzutu do postaci.
//const rzut = RzutKoscmi.stworzRzut([new Kostka(6), new Kostka(6)], true, 2, 5, "Test");