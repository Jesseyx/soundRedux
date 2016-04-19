import { Schema, arrayOf } from 'normalizr';

const song = new Schema('songs');
const user = new Schema('users');

song.define({
  user,
});

export const songSchema = song;
export const userSchema = user;