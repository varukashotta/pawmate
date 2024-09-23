// Import necessary modules from React and React Native
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';

// Dummy JSON data for testing
const commentsData = [
    {
        id: '1',
        author: 'user1',
        content: 'This is the first comment.',
        score: 10,
        timestamp: '2023-10-01T12:34:56Z',
        replies: [
            {
                id: '1-1',
                author: 'user2',
                content: 'This is a reply to the first comment.',
                score: 5,
                timestamp: '2023-10-01T13:00:00Z',
                replies: [],
            },
            {
                id: '1-2',
                author: 'user3',
                content: 'Another reply to the first comment.',
                score: 2,
                timestamp: '2023-10-01T14:00:00Z',
                replies: [
                    {
                        id: '1-2-1',
                        author: 'user4',
                        content: 'Reply to user3.',
                        score: 1,
                        timestamp: '2023-10-01T15:00:00Z',
                        replies: [],
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        author: 'user5',
        content: 'This is the second top-level comment.',
        score: 8,
        timestamp: '2023-10-02T12:00:00Z',
        replies: [],
    },
];

// Comment component to display individual comments and handle replies
const Comment = ({ comment, nestingLevel, addReply, voteComment }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [replying, setReplying] = useState(false);
    const [replyText, setReplyText] = useState('');

    // Function to handle adding a reply
    const handleAddReply = () => {
        if (replyText.trim() !== '') {
            const newReply = {
                id: `${comment.id}-${comment.replies.length + 1}`,
                author: 'CurrentUser', // Replace with actual user name
                content: replyText,
                score: 0,
                timestamp: new Date().toISOString(),
                replies: [],
            };

            addReply(comment.id, newReply);
            setReplyText('');
            setReplying(false);
        }
    };

    return (
        <View style={[styles.commentContainer, { marginLeft: nestingLevel * 10 }]}>
            <View style={styles.commentHeader}>
                <Text style={styles.author}>{comment.author}</Text>
                <Text style={styles.timestamp}>
                    {new Date(comment.timestamp).toLocaleString()}
                </Text>
            </View>
            <Text style={styles.content}>{comment.content}</Text>
            <View style={styles.commentFooter}>
                <Text style={styles.score}>Score: {comment.score}</Text>
                <TouchableOpacity onPress={() => voteComment(comment.id, 1)}>
                    <Text style={styles.voteButton}>Upvote</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => voteComment(comment.id, -1)}>
                    <Text style={styles.voteButton}>Downvote</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setReplying(!replying)}>
                    <Text style={styles.replyButton}>Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
                    <Text style={styles.collapseButton}>
                        {isCollapsed ? 'Expand' : 'Collapse'}
                    </Text>
                </TouchableOpacity>
            </View>
            {replying && (
                <View style={styles.replyInputContainer}>
                    <TextInput
                        style={styles.replyInput}
                        placeholder="Write a reply..."
                        value={replyText}
                        onChangeText={setReplyText}
                    />
                    <TouchableOpacity onPress={handleAddReply}>
                        <Text style={styles.postButton}>Post</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!isCollapsed &&
                comment.replies &&
                comment.replies.length > 0 &&
                comment.replies.map((reply) => (
                    <Comment
                        key={reply.id}
                        comment={reply}
                        nestingLevel={nestingLevel + 1}
                        addReply={addReply}
                        voteComment={voteComment}
                    />
                ))}
        </View>
    );
};

// Main component to render the comment section
const CommentSection = () => {
    const [comments, setComments] = useState(commentsData);

    // Function to add a reply to a comment
    const addReply = (parentId, newReply) => {
        const updatedComments = [...comments];

        const addReplyRecursive = (commentsList) => {
            commentsList.forEach((comment) => {
                if (comment.id === parentId) {
                    comment.replies = [...comment.replies, newReply];
                } else if (comment.replies.length > 0) {
                    addReplyRecursive(comment.replies);
                }
            });
        };

        addReplyRecursive(updatedComments);
        setComments(updatedComments);
    };

    // Function to handle upvoting/downvoting a comment
    const voteComment = (commentId, delta) => {
        const updatedComments = [...comments];

        const voteRecursive = (commentsList) => {
            commentsList.forEach((comment) => {
                if (comment.id === commentId) {
                    comment.score += delta;
                } else if (comment.replies.length > 0) {
                    voteRecursive(comment.replies);
                }
            });
        };

        voteRecursive(updatedComments);
        setComments(updatedComments);
    };

    return (
        <FlatList
            data={comments}
            renderItem={({ item }) => (
                <Comment
                    comment={item}
                    nestingLevel={0}
                    addReply={addReply}
                    voteComment={voteComment}
                />
            )}
            keyExtractor={(item) => item.id}
        />
    );
};

// Styles for the components
const styles = StyleSheet.create({
    commentContainer: {
        padding: 5,
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    author: {
        fontWeight: 'bold',
        color: '#2e2e2e',
    },
    timestamp: {
        color: '#999',
        fontSize: 12,
    },
    content: {
        marginVertical: 5,
        color: '#4a4a4a',
    },
    commentFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    score: {
        marginRight: 10,
        color: '#2e2e2e',
    },
    voteButton: {
        marginHorizontal: 5,
        color: '#007bff',
    },
    replyButton: {
        marginHorizontal: 5,
        color: '#007bff',
    },
    collapseButton: {
        marginLeft: 10,
        color: '#007bff',
    },
    replyInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    replyInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
    },
    postButton: {
        marginLeft: 10,
        color: '#28a745',
    },
});

// Export the main component
export default CommentSection;
