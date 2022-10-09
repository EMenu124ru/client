import { Post } from '../../models/post';
import { PostDto } from '../dtos/postDto';

export namespace PostMapper {

  /**
   * Maps dto to model.
   * @param dto Post dto.
   */
  export function fromDto(dto: PostDto): Post {
    return new Post({
      id: dto.id,
      userId: dto.userId,
      title: dto.title,
      body: dto.body,
    });
  }
}
