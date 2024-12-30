import { Background, Character, CharacterWithoutUser, Emotion } from "@common/openai";
import { Schema, SchemaType } from "@google/generative-ai";

const dialogue = (impersonate: boolean) => ({
    description: 'Speech of a character',
    type: SchemaType.OBJECT,
    properties: {
        speaker: {
            description: 'Character speaking',
            type: SchemaType.STRING,
            enum: Object.values(impersonate ? Character : CharacterWithoutUser),
            nullable: false,
        },
        content: {
            description: 'Content of the speech',
            type: SchemaType.STRING,
            nullable: false,
        },
    },
    required: ['speaker', 'content'],
    nullable: false,
}) as Schema

const paragraph = (impersonate: boolean) => ({
    description: 'Single act of character interaction',
    type: SchemaType.OBJECT,
    properties: {
        narrative: {
            description: 'Description of the situation',
            type: SchemaType.STRING,
            nullable: false,
        },
        emotion: {
            description: 'Emotion of the character',
            type: SchemaType.STRING,
            enum: Object.values(Emotion),
            nullable: false,
        },
        dialogue: dialogue(impersonate),
    },
    required: ['narrative', 'emotion', 'dialogue'],
    nullable: false,
}) as Schema

export const responseSchema = (impersonate: boolean) => ({
    description: 'Your generated situation',
    type: SchemaType.OBJECT,
    properties: {
        location: {
            description: 'Current location of situation',
            type: SchemaType.STRING,
            nullable: false,
        },
        time: {
            description: 'Current time of situation',
            type: SchemaType.STRING,
            nullable: false,
        },
        paragraphs: {
            description: 'List of paragraphs',
            type: SchemaType.ARRAY,
            items: paragraph(impersonate),
            nullable: false,
        },
        background: {
            description: 'Background image of the situation',
            type: SchemaType.STRING,
            enum: Object.values(Background),
            nullable: false,
        }
    },
    required: ['location', 'time', 'paragraphs', 'background'],
    nullable: false,
}) as Schema