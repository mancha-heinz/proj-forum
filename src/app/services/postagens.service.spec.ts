import { TestBed } from '@angular/core/testing';

import { PostagensService } from './postagens.service';

describe('PostagensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostagensService = TestBed.get(PostagensService);
    expect(service).toBeTruthy();
  });
});
