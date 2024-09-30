package minpq;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.MatchResult;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Abstract class providing test cases for all {@link MinPQ} implementations.
 *
 * @see MinPQ
 */
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class MinPQTests {
    /**
     * Returns an empty {@link MinPQ}.
     *
     * @return an empty {@link MinPQ}
     */
    public abstract <E> MinPQ<E> createMinPQ();

    @Test
    public void wcagIndexAsPriority() throws FileNotFoundException {
        File inputFile = new File("data/wcag.tsv");
        MinPQ<String> reference = new DoubleMapMinPQ<>();
        MinPQ<String> testing = createMinPQ();
        Scanner scanner = new Scanner(inputFile);
        while (scanner.hasNextLine()) {
            String[] line = scanner.nextLine().split("\t", 2);
            int index = Integer.parseInt(line[0].replace(".", ""));
            String title = line[1];
            reference.add(title, index);
            testing.add(title, index);
        }
        while (!reference.isEmpty()) {
            assertEquals(reference.removeMin(), testing.removeMin());
        }
        assertTrue(testing.isEmpty());
    }

    @Test
    public void randomPriorities() {
        int[] elements = new int[1000];
        for (int i = 0; i < elements.length; i = i + 1) {
            elements[i] = i;
        }
        Random random = new Random(373);
        int[] priorities = new int[elements.length];
        for (int i = 0; i < priorities.length; i = i + 1) {
            priorities[i] = random.nextInt(priorities.length);
        }

        MinPQ<Integer> reference = new DoubleMapMinPQ<>();
        MinPQ<Integer> testing = createMinPQ();
        for (int i = 0; i < elements.length; i = i + 1) {
            reference.add(elements[i], priorities[i]);
            testing.add(elements[i], priorities[i]);
        }

        for (int i = 0; i < elements.length; i = i + 1) {
            int expected = reference.removeMin();
            int actual = testing.removeMin();

            if (expected != actual) {
                int expectedPriority = priorities[expected];
                int actualPriority = priorities[actual];
                assertEquals(expectedPriority, actualPriority);
            }
        }
    }

    @Test
    public void randomTestingInt() throws FileNotFoundException {
        MinPQ<Integer> reference = new DoubleMapMinPQ<>();
        MinPQ<Integer> testing = createMinPQ();

        int iterations = 10000;
        int maxElement = 1000;
        Random random = new Random();
        for (int i = 0; i < iterations; i += 1) {
            int element = random.nextInt(maxElement);
            double priority = random.nextDouble();
            reference.addOrChangePriority(element, priority);
            testing.addOrChangePriority(element, priority);
            assertEquals(reference.peekMin(), testing.peekMin());
            assertEquals(reference.size(), testing.size());
            for (int e = 0; e < maxElement; e += 1) {
                if (reference.contains(e)) {
                    assertTrue(testing.contains(e));
                    assertEquals(reference.getPriority(e), testing.getPriority(e));
                } else {
                    assertFalse(testing.contains(e));
                }
            }
        }
        for (int i = 0; i < iterations; i += 1) {
            boolean shouldRemoveMin = random.nextBoolean();
            if (shouldRemoveMin && !reference.isEmpty()) {
                assertEquals(reference.removeMin(), testing.removeMin());
            } else {
                int element = random.nextInt(maxElement);
                double priority = random.nextDouble();
                reference.addOrChangePriority(element, priority);
                testing.addOrChangePriority(element, priority);
            }
            if (!reference.isEmpty()) {
                assertEquals(reference.peekMin(), testing.peekMin());
                assertEquals(reference.size(), testing.size());
                for (int e = 0; e < maxElement; e += 1) {
                    if (reference.contains(e)) {
                        assertTrue(testing.contains(e));
                        assertEquals(reference.getPriority(e), testing.getPriority(e));
                    } else {
                        assertFalse(testing.contains(e));
                    }
                }
            } else {
                assertTrue(testing.isEmpty());
            }
        }
    }

    @Test
    public void randomTest() throws FileNotFoundException {
        File inputFile = new File("data/wcag.tsv");
        Map<String, String> wcagDefinitions = new LinkedHashMap<>();
        Scanner scanner = new Scanner(inputFile);
        while (scanner.hasNextLine()) {
            String[] line = scanner.nextLine().split("\t", 2);
            String index = "wcag" + line[0].replace(".", "");
            String title = line[1];
            wcagDefinitions.put(index, title);
        }
        scanner.close();
        MinPQ<String> testing = createMinPQ();
        List<String> topTags = List.of("wcag412", "wcag258", "wcag244");
        Map<String, Double> tagWeights = new HashMap<>();
        double baseWeight = 1.0;
        double enhancedWeight = 10.0;
        for (String tag : wcagDefinitions.keySet()) {
            if (!topTags.contains(tag)) {
                tagWeights.put(tag, baseWeight);
            } else {
                tagWeights.put(tag, enhancedWeight);
            }
        }
        MinPQ<String> reference = new DoubleMapMinPQ<>(tagWeights);
        for (Map.Entry<String, Double> entry : tagWeights.entrySet()) {
            testing.add(entry.getKey(), entry.getValue());
        }
        List<String> weightedTagPool = new ArrayList<>();
        for (String tag : wcagDefinitions.keySet()) {
            double occurrences = tagWeights.get(tag);
            for (int i = 0; i < occurrences; i++) {
                weightedTagPool.add(tag);
            }
        }
        Random random = new Random();
        for (int i = 0; i < 10000; i++) {
            String tag = weightedTagPool.get(random.nextInt(weightedTagPool.size()));
            double currentPriority = tagWeights.get(tag);
            double newPriority = currentPriority + 1;
            tagWeights.put(tag, newPriority);
            if (reference.contains(tag)) {
                reference.changePriority(tag, newPriority);
            } else {
                reference.add(tag, newPriority);
            }
            if (testing.contains(tag)) {
                testing.changePriority(tag, newPriority);
            } else {
                testing.add(tag, newPriority);
            }
        }
        while (!reference.isEmpty()) {
            String refMin = reference.peekMin();
            String testMin = testing.peekMin();
            assertEquals(reference.getPriority(refMin), testing.getPriority(testMin), 0.0001);
            reference.removeMin();
            testing.removeMin();
        }
        assertTrue(testing.isEmpty());
    }
}
