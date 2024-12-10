import { Character, Emotion } from "@common/openai";
import { Schema, SchemaType } from "@google/generative-ai";

const dialogue: Schema = {
    description: 'Speech of a character',
    type: SchemaType.OBJECT,
    properties: {
        speaker: {
            description: 'Character speaking',
            type: SchemaType.STRING,
            enum: Object.values(Character),
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
}

const paragraph: Schema = {
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
        dialogue: dialogue,
    },
    required: ['narrative', 'emotion', 'dialogue'],
    nullable: false,
}

export const responseSchema: Schema = {
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
            items: paragraph,
            nullable: false,
        },
    },
    required: ['location', 'time', 'paragraphs'],
    nullable: false,
}