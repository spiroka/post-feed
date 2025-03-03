import * as navigation from 'next/navigation';
import { screen } from '@testing-library/dom';
import { faker } from '@faker-js/faker';

import { renderWithProviders } from '@/lib/test-utils';
import { Post } from '@/features/posts/types';
import { Id } from '@/convex/_generated/dataModel';
import * as apiSlice from '@/store/slices/api';
import { makeStore } from '@/store';

import { PostContainer } from '../post-container';

vi.mock('next/navigation', async (importActual) => ({
  ...await importActual(),
  useRouter: vi.fn()
}));

vi.mock('convex/nextjs', async (importActual) => ({
  ...await importActual(),
  fetchQuery: vi.fn(() => Promise.resolve(post))
}));

const post: Post = {
  _id: '1' as Id<'posts'>,
  title: faker.word.words(5),
  body: faker.lorem.paragraphs(1),
  _creationTime: Date.UTC(2025, 2, 1, 10, 0),
  author: {
    name: faker.person.fullName(),
    avatarUrl: 'https://placecats.com/100/100'
  }
};

describe('PostContainer', () => {
  it('should render the post', async () => {
    renderWithProviders(<PostContainer post={post} />);

    expect(await screen.findByText(post.title)).toBeInTheDocument();
    expect(await screen.findByText(post.body)).toBeInTheDocument();
    expect(await screen.findByText(post.author.name)).toBeInTheDocument();
  });

  it('should display creation time as relative time', async () => {
    vi.setSystemTime(Date.UTC(2025, 2, 1, 11, 0));
    renderWithProviders(<PostContainer post={post} />);

    expect(await screen.findByText('1 hour ago')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("should redirect to 404 if post doesn't exist", () => {
    vi.spyOn(apiSlice, 'useGetPostByIdQuery').mockReturnValueOnce({ data: null, isSuccess: true, refetch: vi.fn() });
    const notFoundSpy = vi.spyOn(navigation, 'notFound').mockImplementationOnce((() => {}) as () => never);
    renderWithProviders(<PostContainer post={post} />);

    expect(notFoundSpy).toHaveBeenCalled();
  });

  it('should hydrate the store with the provided post', () => {
    const store = makeStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const actionMock = vi.fn();
    vi.spyOn(apiSlice, 'hydratePostAction').mockReturnValue(actionMock);
    renderWithProviders(<PostContainer post={post} />, { store });

    expect(dispatchSpy).toHaveBeenCalledWith(actionMock);
  });
});
