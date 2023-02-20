## Intro

Based on tuto but:

- use vite
- use typescript
- rewrite css
- refactor the all logic

## Init

```
pnpm create vite
pnpm run dev
```

## Flaticon mentions:

- [Flaticon mention 1](https://www.flaticon.com/stickers-pack/animals-139)

- [Flaticon mention 2](https://www.flaticon.com/free-sticker/question_7471579?term=question+mark&page=1&position=5&origin=search&related_id=7471579)

## Code analysis:

There are a few flaws in the design:

- because of the transition used to flip images, when we reset the game, the new shuffled cards quickly appear until the transition to hide previously flipped ends

- because of this design of having the two cards hard-coded:

  - even though the click event is attached to the back card, it can be triggered twice on the same card if we double-click fast enough (before the rotation makes it unclickable). handleChoice is not safe enough either and doesn't check if it's the same card. Consequently, choiceTwo will receive the same card as choiceOne, and reveal the pair.

  - also, the DOM evidently reveals the solution

Other discussions:

- random uid is overkill: just use basic increment

- is useEffect really required?

- useEffect for delay should return the callback () => clearTimout(id)

### Options

#### Hack the design

- timeout the suffling so we first flip card back

- only handleClick/choice if card is different of choiceOne (or only fire the event if the card isn't flipped already)

#### Refactor

- Only one img tag per card.
- id (12) id_pair (6)
- the Card only needs to receive img, handleClick +/-clickable (but it's probably easier to deal with it externally)
