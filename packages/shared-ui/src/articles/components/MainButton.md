---
title: Main Button
description: Main Button component.
date: "2023-7-27"
author: "Joakim Edvardsen"
published: true
---

<script>
  import MainButton from '../../lib/components/buttons/MainButton.svelte'
</script>

This is the main button component!

What happens with more context? And this time it should be really long so it wraps around to the next line!

<h2 id="usage">Usage</h2>

This is how you can use it:

```svelte
<MainButton on:click={() => console.log('clicked!')}>Click me!</MainButton>
```

<MainButton on:click={() => console.log('clicked!')}>Click me</MainButton>

<h2 id="another-header">Another header</h2>
