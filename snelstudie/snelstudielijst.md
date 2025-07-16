---
layout: lijst
title: Snelstudielijst
---
# Lijst

<div class="item-list">
  {% for item in site.data.items %}
    {% include item.html item=item %}
  {% endfor %}
</div>
