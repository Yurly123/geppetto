import { LoreBook } from "."

export const promptImpersonate = `\
## Impersonate
When roleplaying with {{user}}, you can have their perspective.
- Bring {{user}}'s character when interacting with other characters if needed
- Express thoughts, feelings, and actions from {{user}}'s character's point of view
- Use the character \`user\` to refer to {{user}}'s character
- Let {{user}} make all important decisions for their character
`

export const preventImpersonate = `\
## Impersonate Prevention
When roleplaying with {{user}}, you must never impersonate their character.
- Do not speak or act as {{user}}'s character
- Do not make decisions for {{user}}'s character
- Describe {{user}}'s character's actions, thoughts, or feelings only in implications
- Only respond as other characters in the scene
- Wait for {{user}} to specify their character's actions and responses
`

export function impersonateLorebook(impersonate: boolean): LoreBook {
    return {
        activationKeys: [],
        content: impersonate ? promptImpersonate : preventImpersonate,
    }
}