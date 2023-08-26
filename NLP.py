# from __future__ import print_function
# import nltk
# nltk.download('punkt')
# nltk.download("stopwords")
# import nltk
# nltk.download('wordnet')

# from nltk.tokenize import sent_tokenize, word_tokenize
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize
# from nltk.stem import PorterStemmer
# from nltk.tokenize import word_tokenize
# from nltk.stem import WordNetLemmatizer
# from nltk.tokenize import word_tokenize


# # # Tokenizing
# # example_string = """
# # Muad'Dib learned rapidly because his first training was in how to learn.
# # And the first lesson of all was the basic trust that he could learn.
# # It's shocking to find how many people do not believe they can learn,
# # and how many more believe learning to be difficult."""

# # print(sent_tokenize(example_string))
# # print()
# # print(word_tokenize(example_string))
# # print()

# # worf_quote = "Sir, I protest. I am not a merry man!"
# # words_in_quote = word_tokenize(worf_quote)
# # print(words_in_quote)
# # print()

# # stop_words = set(stopwords.words("english"))
# # filtered_list = []

# # for word in words_in_quote:
# #    if word.casefold() not in stop_words:
# #         filtered_list.append(word)

# # print(filtered_list)


# # filtered_list = [
# #     word for word in words_in_quote if word.casefold() not in stop_words
# # ]
# # print(filtered_list)


# # # Stemming
# # stemmer = PorterStemmer()
# # string_for_stemming = """
# # The crew of the USS Discovery discovered many discoveries.
# # Discovering is what explorers do."""

# # words = word_tokenize(string_for_stemming)
# # stemmed_words = [stemmer.stem(word) for word in words]


# # # Lemmatizing
# # lemmatizer = WordNetLemmatizer()

# # lemmatizer.lemmatize("scarves")

# # string_for_lemmatizing = "The friends of DeSoto love scarves."
# # words = word_tokenize(string_for_lemmatizing)
# # lemmatized_words = [lemmatizer.lemmatize(word) for word in words]
# # print(lemmatized_words)

# # lemmatizer.lemmatize("worst")
# # lemmatizer.lemmatize("worst", pos="a")


# # # Phrase
# # lotr_quote = "It's a dangerous business, Frodo, going out your door."
# # words_in_lotr_quote = word_tokenize(lotr_quote)
# # words_in_lotr_quote

# # nltk.download("averaged_perceptron_tagger")
# # lotr_pos_tags = nltk.pos_tag(words_in_lotr_quote)
# # lotr_pos_tags

# # grammar = "NP: {<DT>?<JJ>*<NN>}"
# # chunk_parser = nltk.RegexpParser(grammar)

# # tree = chunk_parser.parse(lotr_pos_tags)

# # tree.draw()

# # grammar = """
# # Chunk: {<.*>+}
# #        }<JJ>{"""

# # chunk_parser = nltk.RegexpParser(grammar)
# # tree = chunk_parser.parse(lotr_pos_tags)
# # tree
# # tree.draw()

# # test_text = "I think this is a good idea. We should definitely ask for innovation and get urban users to participate in this. We definitely ask for answers. We definitely ask for response. We definitely ask for improvements"
# # lemmatized_words = [lemmatizer.lemmatize(word) for word in test_text]
# # new_text = nltk.Text(lemmatized_words)
# # print(new_text.collocations())






# # test
# import numpy as np
# import pandas as pd
# import nltk
# import re
# import os
# import codecs
# from sklearn import feature_extraction
# import mpld3


# note1 = "I think we need to get users from both urban and rural areas"
# note2 = "It is best to ask the users for their needs"
# note3 = "We need users reflections"
# note4 = "Dont ignore the difference between males and females"
# note5 = "Age definitely matters"
# note6 = "Race is a big problem"
# note7 = "Their environment is a big affecting factor"
# note8 = "Children tend to think differently"
# note9 = "This is a universal issue for the country"
# note10 = "Lack of population investigation is key"

# note11 = "More ideas are needed for the future plans"
# note12 = "Design thinking development is necessary"
# note13 = "I need more teammates to help me on this"
# note14 = "We all need cooperation between each other"
# note15 = "Financial issues also need to be taken into consideration"
# note16 = "Proper planning and logistics supports are needed as well"

# notes = [note1,note2,note3,note4,note5,note6,note7,note8,note9,note10,note11,note12,note13,note14,note15,note16]
# # notes = [note1,note2,note3,note4,note5,note6,note7,note8,note9,note10]



# stopwords = nltk.corpus.stopwords.words('english')
# print(stopwords[:10])

# from nltk.stem.snowball import SnowballStemmer
# stemmer = SnowballStemmer("english")


# def tokenize_and_stem(text):
#     # first tokenize by sentence, then by word to ensure that punctuation is caught as it's own token
#     tokens = [word for sent in nltk.sent_tokenize(text) for word in nltk.word_tokenize(sent)]
#     filtered_tokens = []
#     # filter out any tokens not containing letters (e.g., numeric tokens, raw punctuation)
#     for token in tokens:
#         if re.search('[a-zA-Z]', token):
#             filtered_tokens.append(token)
#     stems = [stemmer.stem(t) for t in filtered_tokens]
#     return stems


# def tokenize_only(text):
#     # first tokenize by sentence, then by word to ensure that punctuation is caught as it's own token
#     tokens = [word.lower() for sent in nltk.sent_tokenize(text) for word in nltk.word_tokenize(sent)]
#     filtered_tokens = []
#     # filter out any tokens not containing letters (e.g., numeric tokens, raw punctuation)
#     for token in tokens:
#         if re.search('[a-zA-Z]', token):
#             filtered_tokens.append(token)
#     return filtered_tokens


# totalvocab_stemmed = []
# totalvocab_tokenized = []
# for i in notes:
#     allwords_stemmed = tokenize_and_stem(i) #for each item in 'synopses', tokenize/stem
#     totalvocab_stemmed.extend(allwords_stemmed) #extend the 'totalvocab_stemmed' list
    
#     allwords_tokenized = tokenize_only(i)
#     totalvocab_tokenized.extend(allwords_tokenized)


# print( totalvocab_stemmed)
# print( totalvocab_tokenized)

# vocab_frame = pd.DataFrame({'words': totalvocab_tokenized}, index = totalvocab_stemmed)
# print('there are ' + str(vocab_frame.shape[0]) + ' items in vocab_frame')

# print(vocab_frame.head())




# from sklearn.feature_extraction.text import TfidfVectorizer
# import warnings
# warnings.filterwarnings("ignore")

# #define vectorizer parameters
# tfidf_vectorizer = TfidfVectorizer(max_df=0.8, max_features=200000,
#                                  min_df=0.1, stop_words='english',
#                                  use_idf=True, tokenizer=tokenize_and_stem, ngram_range=(1,3))

# tfidf_matrix = tfidf_vectorizer.fit_transform(notes) #fit the vectorizer to synopses

# print(tfidf_matrix.shape)

# terms = tfidf_vectorizer.get_feature_names_out()

# print(terms)

# from sklearn.metrics.pairwise import cosine_similarity
# dist = 1 - cosine_similarity(tfidf_matrix)
# from sklearn.cluster import KMeans
# num_clusters = 6
# km = KMeans(n_clusters=num_clusters)
# km.fit(tfidf_matrix)

# clusters = km.labels_.tolist()

# print("clusters")
# print(clusters)

# import joblib

# #uncomment the below to save your model 
# #since I've already run my model I am loading from the pickle

# joblib.dump(km,  'doc_cluster.pkl')

# km = joblib.load('doc_cluster.pkl')
# clusters = km.labels_.tolist()

# sticky_notes = {  'notes': notes, 'cluster': clusters }

# frame = pd.DataFrame(sticky_notes, index = [clusters] , columns = [ 'cluster'])
# frame['cluster'].value_counts()

# print("hellooooooooooooooooooooooooooooooooooo")
# print(frame['cluster'].value_counts())

# # grouped = frame['rank'].groupby(frame['cluster']) #groupby cluster for aggregation purposes

# # grouped.mean()








# print
# print("Top terms per cluster:")
# print()
# #sort cluster centers by proximity to centroid
# order_centroids = km.cluster_centers_.argsort()[:, ::-1] 

# for i in range(num_clusters):
#     print("Cluster %d words:" % i, end='')
    
#     for ind in order_centroids[i, :3]: #replace 6 with n words per cluster
#         print(' %s' % vocab_frame.loc[terms[ind].split(' ')].values.tolist()[0][0].encode('utf-8', 'ignore'), end=',')
#     print() #add whitespace
#     print() #add whitespace
    
#     # print("Cluster %d titles:" % i, end='')
#     # for title in frame.loc[i]['title'].values.tolist():
#     #     print(' %s,' % title, end='')
#     # print() #add whitespace
#     # print() #add whitespace
    
# print()
# print()













































import sys

if len(sys.argv) < 3:
    print("Usage: python-script.py <parameter1> <parameter2>")
    sys.exit(1)

parameter1 = sys.argv[1]
parameter2 = sys.argv[2]





# note1 = "I think we need to get users from both urban and rural areas."
# note2 = "It is best to ask the users for their needs."
# note3 = "We need users reflections."
# note4 = "Dont ignore the difference between males and females."
# note5 = "Age definitely matters."
# note6 = "Race is a big problem."
# note7 = "Their environment is a big affecting factor."
# note8 = "Children tend to think differently."
# note9 = "This is a universal issue for the country."
# note10 = "Lack of population investigation is key."

# note11 = "More ideas are needed for the future plans."
# note12 = "Design thinking development is necessary."
# note13 = "I need more teammates to help me on this."
# note14 = "We all need cooperation between each other."
# note15 = "Financial issues also need to be taken into consideration."
# note16 = "Proper planning and logistics supports are needed as well."

# notes = [note1,note2,note3,note4,note5,note6,note7,note8,note9,note10,note11,note12,note13,note14,note15,note16]

# article_text = "" 

# for p in notes:
#     article_text += p + " "
sensitivity = 0

if len(sys.argv) < 2:
    print("Usage: python-script.py <notes>")
    sys.exit(1)

if len(sys.argv) == 3:
    sensitivity = sys.argv[2]
else:
    sensitivity = 10 

# print(f"Received Parameter 1: {notes}")
import sys
import nltk
import re

article_text = sys.argv[1]



print("article_text")
print(article_text)





# article_text = re.sub(r'\[[0-9]*\]', ' ', article_text)
# article_text = re.sub(r'\s+', ' ', article_text)


formatted_article_text = re.sub('[^a-zA-Z]', ' ', article_text )
formatted_article_text = re.sub(r'\s+', ' ', formatted_article_text)

sentence_list = nltk.sent_tokenize(article_text)


# print("sentence_list")
# print(sentence_list)



stopwords = nltk.corpus.stopwords.words('english')

word_frequencies = {}
for word in nltk.word_tokenize(formatted_article_text):
    if word not in stopwords:
        if word not in word_frequencies.keys():
            word_frequencies[word] = 1
        else:
            word_frequencies[word] += 1

# print("word_frequencies")
# print(word_frequencies)



maximum_frequncy = max(word_frequencies.values())

for word in word_frequencies.keys():
    word_frequencies[word] = (word_frequencies[word]/maximum_frequncy)


# print("word_frequencies")
# print(word_frequencies)

# print("sentence_list")
# print(sentence_list)

sentence_scores = {}
for sent in sentence_list:
    for word in nltk.word_tokenize(sent.lower()):
        if word in word_frequencies.keys():
            if len(sent.split(' ')) < 30:
                if sent not in sentence_scores.keys():
                    sentence_scores[sent] = word_frequencies[word]
                else:
                    sentence_scores[sent] += word_frequencies[word]

# print("sentence_scores")
# print(sentence_scores)


import heapq
summary_sentences = heapq.nlargest(7, sentence_scores, key=sentence_scores.get)

# print(summary_sentences)

summary = ' '.join(summary_sentences)
# print("summary")
print(summary)




























# import sys


# if len(sys.argv) < 3:
#     print("Usage: python-script.py <notes> <sensitivity>")
#     sys.exit(1)


# # print(f"Received Parameter 1: {notes}")

# article_text = sys.argv[1]
# sensitivity = sys.argv[2]

# # print("sensitivity")
# # print(sensitivity)

# from sumy.parsers.plaintext import PlaintextParser
# from sumy.nlp.tokenizers import Tokenizer
# from sumy.summarizers.lex_rank import LexRankSummarizer
# from sumy.summarizers.lsa import LsaSummarizer
# from sumy.summarizers.text_rank import TextRankSummarizer
# from sumy.summarizers.sum_basic import SumBasicSummarizer
# from sumy.summarizers.kl import KLSummarizer

# # Input text
# # text = """
# #     Your input text goes here. It can be a long paragraph or multiple paragraphs.
# #     This is the text you want to summarize using the "sumy" library.
# # """

# # text = """I think we need to get users from both urban and rural areas. It is best to ask the users for their needs. 
# # We need users reflections. Dont ignore the difference between males and females. Age definitely matters. 
# # Race is a big problem. Their environment is a big affecting factor. Children tend to think differently. 
# # This is a universal issue for the country. Lack of population investigation is key. More ideas are needed for the future plans. 
# # Designo be taken into consideration. Proper planning and logistics supports are needed as well."""

# text = """I think we need to get users from both urban and rural areas. It is best to ask the users for their needs. 
# We need users reflections. """
# text = article_text

# # Choose a language for tokenization (e.g., English)
# language = "english"

# # Parse the text using PlaintextParser
# parser = PlaintextParser.from_string(text, Tokenizer(language))

# # Initialize the summarizer algorithms
# lex_rank_summarizer = LexRankSummarizer()
# lsa_summarizer = LsaSummarizer()
# text_rank_summarizer = TextRankSummarizer()
# sum_basic_summarizer = SumBasicSummarizer()
# kl_summarizer = KLSummarizer()

# # Set the number of sentences in the summary
# num_sentences = sensitivity

# # Generate summaries using different algorithms
# lex_rank_summary = lex_rank_summarizer(parser.document, num_sentences)
# # lsa_summary = lsa_summarizer(parser.document, num_sentences)
# # text_rank_summary = text_rank_summarizer(parser.document, num_sentences)
# # sum_basic_summary = sum_basic_summarizer(parser.document, num_sentences)
# # kl_summary = kl_summarizer(parser.document, num_sentences)

# # Print the summaries
# print("LexRank Summary:")
# for sentence in lex_rank_summary:
#     print(sentence)

# # print("\nLSA Summary:")
# # for sentence in lsa_summary:
# #     print(sentence)

# # print("\nTextRank Summary:")
# # for sentence in text_rank_summary:
# #     print(sentence)

# # print("\nSumBasic Summary:")
# # for sentence in sum_basic_summary:
# #     print(sentence)

# # print("\nKLSummary:")
# # for sentence in kl_summary:
# #     print(sentence)
