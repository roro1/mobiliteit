---
layout: lijst
title: Snelstudielijst
header_image: img/Pontje.jpg
---
# Snelstudies

Snelstudies zijn kortlopende onderzoeken waarin we in teamverband intensief aan kansen voor Zuid-Holland werken. Snelstudies zijn onderdeel van de Toekomstagenda Zuid-Holland en dienen ter inspiratie. 

<div class="item-list">
  {% for item in site.data.items %}
    {% include item.html item=item %}
  {% endfor %}
</div>
