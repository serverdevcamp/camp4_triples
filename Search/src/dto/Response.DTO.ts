import { Users } from "../entities/Users";
import { Posts } from "../entities/Posts";
import { Tracks } from "../entities/Tracks";
import { genreConfig } from "../utils/enumConfig.util";

class ResponseTracks {
  //  tracaks DB
  public title: string | null;
  public genre: string | null;
  public type: string | null;
  public track_source: string | null;
  public image: string | null;
  public played_count: number;
  public moods: string | null;
  //  posts DB
  public tags: string | null;
  public comment_count: number;
  public like_count: number;
  //  users DB
  public user_id: string | null;
  public nickname: string | null;

  constructor(tracks: Tracks, posts: Posts| any, users: Users| any) {
    this.title = tracks.title;
    this.genre = this.genreConfig(tracks.genreIdx);
    this.type = this.typeConfig(tracks.typeIdx);
    this.track_source = tracks.trackSource;
    this.image = tracks.image;
    this.played_count = tracks.playedCount;
    this.moods = tracks.moods;
    this.tags = posts.tags;
    this.comment_count = posts.commentsCount;
    this.like_count = posts.likesCount;
    this.user_id = users.userId;
    this.nickname = users.nickname;
  }

  private genreConfig(genreIdx: number | null): string {
    if (genreIdx === 1) return 'pop';
    if (genreIdx === 2) return 'hiphop';
    if (genreIdx === 3) return 'rnb';
    if (genreIdx === 4) return 'indie';
    if (genreIdx === 5) return 'rock';
    if (genreIdx === 6) return 'edm';
    if (genreIdx === 7) return 'house';
    if (genreIdx === 8) return 'country';
    if (genreIdx === 9) return 'classical';
    if (genreIdx === 10) return 'jazz';
    return '';
  }
  private typeConfig(typeIdx: number | null): string {
    if (typeIdx === 1) return 'MR';
    if (typeIdx === 2) return 'song';
    return '';
  }
}
class ResponseUsers{
  public user_id: string| null;
  public nickname: string| null;
  public profile_pic: string| null;
  public follower_count: number;
  public following_count: number;
  
  constructor(users: Users | any){
    this.user_id = users.userId;
    this.nickname = users.nickname;
    this.profile_pic = this.profilePicParser(users.profile);
    this.follower_count = users.followerCount;
    this.following_count = users.followingCount;
  }

  private profilePicParser(profile:string){
    const result = JSON.parse(profile);
    const ret:string = result.profile_pic;
    return ret;
  }
}

class ResponseObj{
  access_token: string| any;
  tracks : ResponseTracks[]| any;
  users: ResponseUsers[]| any;
  constructor(){
    this.access_token = '';
    this.tracks = [];
    this.users = [];
  }
};
export { ResponseTracks, ResponseUsers, ResponseObj };