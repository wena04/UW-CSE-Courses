package seamfinding;

import seamfinding.energy.EnergyFunction;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Dynamic programming implementation of the {@link SeamFinder} interface.
 *
 * @see SeamFinder
 */
public class DynamicProgrammingSeamFinder implements SeamFinder {

    @Override
    public List<Integer> findHorizontal(Picture picture, EnergyFunction f) {
        // TODO: Replace with your code
        int width = picture.width();
        int height = picture.height();
        double[][] dp = new double[width][height];
        int[][] edgeTo = new int[width][height];

        // Initialize the leftmost column with the energy values
        for (int y = 0; y < height; y++) {
            dp[0][y] = f.apply(picture, 0, y);
        }

        // Fill the DP table
        for (int x = 1; x < width; x++) {
            for (int y = 0; y < height; y++) {
                double minEnergy = dp[x - 1][y];
                edgeTo[x][y] = y;

                if (y > 0 && dp[x - 1][y - 1] < minEnergy) {
                    minEnergy = dp[x - 1][y - 1];
                    edgeTo[x][y] = y - 1;
                }
                if (y < height - 1 && dp[x - 1][y + 1] < minEnergy) {
                    minEnergy = dp[x - 1][y + 1];
                    edgeTo[x][y] = y + 1;
                }

                dp[x][y] = f.apply(picture, x, y) + minEnergy;
            }
        }

        // Find the minimum energy in the rightmost column
        double minTotalEnergy = dp[width - 1][0];
        int minY = 0;
        for (int y = 1; y < height; y++) {
            if (dp[width - 1][y] < minTotalEnergy) {
                minTotalEnergy = dp[width - 1][y];
                minY = y;
            }
        }

        // Trace back the seam
        List<Integer> seam = new ArrayList<>();
        int y = minY;
        for (int x = width - 1; x >= 0; x--) {
            seam.add(y);
            y = edgeTo[x][y];
        }
        Collections.reverse(seam);

        return seam;
    }
}
