"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const filterPrompt = (searchValue) => {
    const filtered = posts.filter((post) => {
      const searchableValues = [
        post.prompt,
        post.tag,
        post.creator.email,
        post.creator.username,
      ];
      return searchableValues.some((value) => {
        return value.toLowerCase().includes(searchValue);
      });
      // return (
      //   post.prompt.toLowerCase().includes(searchValue) ||
      //   post.tag.toLowerCase().includes(searchValue) ||
      //   post.creator.email.toLowerCase().includes(searchValue) ||
      //   post.creator.username.toLowerCase().includes(searchValue)
      // );
    });
    setFilteredPosts(filtered);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);
    filterPrompt(searchValue);
  };

  const handleTagClick = (e) => {
    setSearchText(e);
    filterPrompt(e);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
