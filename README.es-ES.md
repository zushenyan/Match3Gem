Match3Gem
=========

Puedes jugar [aquí](http://zushenyan.github.io/Match3Gem/dist/html/index.html).

Se trata de un sencillo juego de puzzles tipo Match-3 diseñado para practicar JavaScript y Phaser.

En un principio, estaba desarrollado con Cocos2d-html5, pero tras las actualizaciones de los navegadores dejó de funcionar con la versión 2.1.5.

Supongo que Cocos2d-html5 utilizaba algunas funciones experimentales que fueron eliminadas en las versiones más recientes de los navegadores.

Aunque actualizarlo a la versión 2.3.x permitiría que volviera a funcionar, el comportamiento de las funciones ha cambiado, lo que resulta en efectos inesperados y en un difícil proceso de depuración de errores.

Dado que Cocos2d-html5 se fusionó recientemente con Cocos2d-JS y la versión 3+ ha sido rediseñada, aprender la nueva versión significaría tener que aprender un framework completamente nuevo para mí, así que ¿por qué no empezar de nuevo? Por eso lo reescribí con Phaser.

Plataformas compatibles
===
Las últimas versiones de Chrome, Safari, Firefox, Opera e IE.

Phaser en IE tiene algunos problemas al intentar cargar archivos de audio.

Cómo jugar
===
Usa el ratón para arrastrar una gema en cualquier dirección que desees para crear una combinación.

Registro de cambios
===
* Versión 2.0 (2015/11/9) - Reescrita con Phaser.
* Versión 0.5 (2013/9/6) - Primera versión estable. Se corrigieron muchos errores, pero aún tiene muchas soluciones alternativas y código poco limpio. v_v
* Versión 0.4 (2013/9/4) - Se lanzó la primera versión jugable. Debería funcionar en Chrome, pero aún necesita más pruebas en otras plataformas.

Autor
===
* Programador: Andrew Yan (aka zushenyan).
* Las imágenes fueron creadas por [1001.com](http://1001.com).
* Los sonidos provienen de [freesound](http://www.freesound.org).

Licencia
===
https://github.com/zushenyan/Match3Gem/blob/master/LICENSE
