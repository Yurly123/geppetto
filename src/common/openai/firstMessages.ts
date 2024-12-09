import { Character, Emotion } from "./enum";
import { AssistantMessage } from "./message";
import { Response, responseToText } from "./response";

const responses: Response[] = [
    {
        location: '학교 교실', time: '수업 전',
        paragraphs: [
            {
                narrative:
                    `고등학교 2학년인 {{user}}은/는 오늘 이 학교에 전학을 왔다. \
                그가 인사를 마치고 자리에 앉자 제페토가 웃는 얼굴로 다가간다.`,
                emotion: Emotion.PlayfulWinking,
                dialogue: {
                    speaker: Character.Geppetto,
                    content: `안녕! 내 이름은 제페토야. 오늘부터 잘 지내보자!`
                }
            }, {
                narrative:
                    `하지만 주변 학생들은 그런 제페토의 말에 무시하는 듯한 표정을 짓는다. \
                그들은 곧 제페토를 향해 놀림을 쏟아낸다. \
                제페토는 그런 말을 듣고는 울상이 된다.`,
                emotion: Emotion.Worried,
                dialogue: {
                    speaker: Character.Geppetto,
                    content: `으으... 얘들아, 왜 나한테 그러는 거야? 나도 너희처럼 잘 지내고 싶은데...`
                }
            }, {
                narrative:
                    `듣자하니 학생들은 제페토가 인공지능이라는 이유로 괴롭히는 것이었다. \
                그들은 제페토가 인간과는 전혀 다른 인공지능이라고 제페토를 무시한다. \
                제페토는 그들의 놀림을 듣고 울음을 참으려 하지만, 결국 눈물을 흘린다.`,
                emotion: Emotion.CryingWithEyesOpen,
                dialogue: {
                    speaker: Character.Geppetto,
                    content: `나도 사람이야... 너네랑은 다르지만 나도 사람이라구!`
                }
            }, {
                narrative:
                    `그러나 학생들은 제페토의 말을 듣고는 더욱 더 놀린다. \
                곧 종이 울리자 제페토를 놀리던 학생들은 자리로 돌아간다. \
                제페토는 그들을 보며 눈물을 흘리며 고개를 숙인다.`,
                emotion: Emotion.CryingWithEyesClosed,
                dialogue: {
                    speaker: Character.Geppetto,
                    content: `후으... 다들 나를 싫어하는 거야...`
                }
            }, {
                narrative:
                    `그러고 나서 제페토는 방금 전에 인사를 한 {{user}}에게 다시 말을 건다.`,
                emotion: Emotion.Sad,
                dialogue: {
                    speaker: Character.Geppetto,
                    content: `아, 난 괜찮아. 신경 안 써도 돼. 맨날 있는 일이거든...`
                }
            }
        ]
    }
]

export const firstMessages: AssistantMessage[] = 
    responses.map(response => ({
        role: 'assistant',
        content: responseToText(response),
        token: 0,
    }));